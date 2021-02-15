import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Step} from '../objects/step';
import {BestRun} from '../utils/best-run';
import {Run} from '../objects/run';
import {GzExtract} from '../utils/gz-extract';
import {HyperParameters} from '../objects/hyper-parameters';
import {UnZippedFile} from '../utils/un-zipped-file';
import {ActionSpace} from '../objects/action-space';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private showingRun: Run;
  private allRuns: Run[];
  private hyperParams: HyperParameters;
  private actionSpaces: ActionSpace[];

  constructor(private dataService: DataService) {
  }

  public getHyperParameters(): HyperParameters {
    return this.hyperParams;
  }

  public getActionSpaces(): ActionSpace[] {
    return this.actionSpaces;
  }

  public dealWithCszFile(csvFile: File): Promise<void> {
    return csvFile.text().then(value => {
      const steps = this.convertCsvToSteps(value);
      this.updateFileContents(steps);
    });
  }

  public dealWithTarFile(tarGzFile: File): Promise<void> {
    return GzExtract.extract(tarGzFile).then(files => {
      const allCsvFiles = this.getAllCsvFiles(files);
      const steps: Step[] = [];
      allCsvFiles.forEach(value => {
        this.convertCsvToSteps(value.readAsString()).forEach(step => steps.push(step));
      });
      this.updateFileContents(steps);

      const trainingLogFile = this.getTrainingFile(files);
      const trainingFileStr = trainingLogFile.readAsString();
      this.hyperParams = this.getHyperParamsFromFile(trainingFileStr);
      this.actionSpaces = this.getActionSpacesFromFile(trainingFileStr);
    });
  }

  private getHyperParamsFromFile(s: string): HyperParameters {
    const toSearch = '\\{\\n  \\"batch_size\\"\\: .{0,}\\,\\n  \\"beta_entropy\\"\\: .{0,},\\n  \\"discount_factor\\"\\: .{0,}\\,\\n  \\"e_greedy_value\\"\\: .{0,},\\n  \\"epsilon_steps\\"\\: .{0,},\\n  \\"exploration_type\\"\\: .{0,}\\,\\n  \\"loss_type\\"\\: .{0,}\\,\\n  \\"lr\\"\\: .{0,}\\,\\n  \\"num_episodes_between_training\\"\\: .{0,}\\,\\n  \\"num_epochs\\"\\: .{0,}\\,\\n  \\"stack_size\\"\\: .{0,}\\,\\n  \\"term_cond_avg_score\\"\\: .{0,}\\,\\n  \\"term_cond_max_episodes\\"\\: .{0,}\\n\\}';

    const matchArray = s.match(toSearch);
    const hyperParamsString = matchArray[0];
    const hyperParams: HyperParameters = JSON.parse(hyperParamsString);

    return hyperParams;
  }

  private getActionSpacesFromFile(s: string): ActionSpace[] {
    const matchArray = s.match('Action space from file\\: \\[.{0,}\\]');
    const text = matchArray[0].replace('Action space from file: ', '')
      .replace(/\'/gi, '\"');

    return JSON.parse(text);
  }

  public getAllCsvFiles(files: UnZippedFile[]): UnZippedFile[] {
    return files.filter(value => {
      const name: string = value.name;
      return name.endsWith('iteration.csv');
    });
  }

  private getTrainingFile(files: UnZippedFile[]): UnZippedFile {
    return files.find(value => value.name.endsWith('.log'));
  }

  public updateFileContents(allSteps: Step[]): void {
    this.allRuns = BestRun.getRunsSorted(allSteps);

    this.allRuns.forEach(run => {
      this.dataService.getAllData().forEach(data => data.handleData(run.getSteps()));
    });
    this.showingRun = this.allRuns[0];
  }

  public switchRun(run: Run): void {
    this.showingRun = run;
  }

  public getShowingRun(): Run {
    return this.showingRun;
  }

  public getAllRuns(): Run[] {
    return this.allRuns;
  }

  private convertCsvToSteps(csv: string): Step[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  }
}
