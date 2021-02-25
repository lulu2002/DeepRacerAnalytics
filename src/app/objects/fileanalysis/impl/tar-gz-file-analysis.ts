import {FileAnalysis} from '../file-analysis';
import {RacerData} from '../racer-data';
import {GzExtract} from '../../../utils/gz-extract';
import {Step} from '../../step';
import {HyperParameters} from '../../hyper-parameters';
import {ActionSpace} from '../../action-space';
import {UnZippedFile} from '../../../utils/un-zipped-file';
import {Converters} from '../coverters/converters';

export class TarGzFileAnalysis implements FileAnalysis {

  analysis(file: File): Promise<RacerData> {
    return GzExtract.extract(file).then(files => {
      const allCsvFiles = this.getAllCsvFiles(files);
      const steps: Step[] = [];

      allCsvFiles.forEach(value => {
        Converters.convertCsvToSteps(value.readAsString()).forEach(step => steps.push(step));
      });

      const trainingLogFile = this.getTrainingFile(files);
      const trainingFileStr = trainingLogFile.readAsString();

      const hyperParams = this.getHyperParamsFromFile(trainingFileStr);
      const actionSpaces = this.getActionSpacesFromFile(trainingFileStr);

      return new RacerData(steps, hyperParams, actionSpaces);
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

  private getAllCsvFiles(files: UnZippedFile[]): UnZippedFile[] {
    return files.filter(value => {
      const name: string = value.name;
      return name.endsWith('.csv');
    });
  }

  private getTrainingFile(files: UnZippedFile[]): UnZippedFile {
    return files.find(value => value.name.endsWith('.log'));
  }
}
