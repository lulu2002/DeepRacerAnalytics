import {FileAnalysis} from '../file-analysis';
import {RacerData} from '../racer-data';
import {GzExtract} from '../../../utils/gz-extract';
import {Step} from '../../step';
import {HyperParameters} from '../../hyper-parameters';
import {ActionSpace} from '../../action-space';
import {UnZippedFile} from '../../../utils/un-zipped-file';
import {Converters} from '../../../utils/converters';

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
    const search = 'Using the following hyper\\-parameters\\n\\{[\\s\\S]*\\"term_cond_max_episodes\\"\\: .{0,}\\n\\}';

    const matchArray = s.match(search);
    const hyperParamsString = matchArray[0]
      .replace('Using the following hyper-parameters', '');
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
