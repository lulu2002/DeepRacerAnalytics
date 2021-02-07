import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Step} from '../objects/step';
import {BestRun} from '../utils/best-run';
import {Run} from '../objects/run';
import {GzExtract} from '../utils/gz-extract';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private showingRun: Run;
  private allRuns: Run[];

  constructor(private dataService: DataService) {
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
    });
  }

  public getAllCsvFiles(files: any[]): any[] {
    return files.filter(value => {
      const name: string = value.name;
      return name.endsWith('iteration.csv');
    });
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
