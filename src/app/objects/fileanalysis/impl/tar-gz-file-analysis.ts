import {FileAnalysis} from '../file-analysis';
import {RacerData} from '../racer-data';
import {GzExtract} from '../../../utils/gz-extract';
import {Step} from '../../step';
import {HyperParameters} from '../../hyper-parameters';
import {ActionSpace} from '../../action-space';
import {UnZippedFile} from '../../../utils/un-zipped-file';
import {Converters} from '../../../utils/converters';
import {Metric} from '../../metric';
import {EnvironmentInfo} from '../../environment-info';
import {analyseStateObserver} from '../../observer/observers';
import {AnalysisState} from '../analysis-state';

export class TarGzFileAnalysis implements FileAnalysis {

  analysis(file: File): Promise<RacerData> {
    analyseStateObserver.next(AnalysisState.EXTRACTING_FILE);

    return GzExtract.extract(file).then(files => {
      const allCsvFiles = this.getAllCsvFiles(files);
      const steps: Step[] = this.mergeCsvFiles(allCsvFiles).filter(value => value.episode > 0);

      const trainingLogFiles = this.getTrainingFiles(files);
      analyseStateObserver.next(AnalysisState.READING_LOGS);
      const trainingFileStr = trainingLogFiles[0].readAsString();
      const metricFile = files.find(value => value.name.endsWith('.json'));

      const hyperParams = this.getHyperParamsFromFile(trainingFileStr);
      const actionSpaces = this.getActionSpacesFromFile(trainingFileStr);
      const track = this.getEnviorent(trainingLogFiles);
      const metrics = this.getMetrics(metricFile);

      return new RacerData(steps, hyperParams, actionSpaces, metrics, track);
    });
  }

  private mergeCsvFiles(allCsvFiles: UnZippedFile[]): Step[] {
    analyseStateObserver.next(AnalysisState.MERGING_CSV_FILES);

    const steps: Step[] = [];

    allCsvFiles.forEach(value => {
      const csv = value.readAsString();
      Converters.convertCsvToSteps(csv).forEach(step => steps.push(step));
    });

    return steps;
  }

  private getHyperParamsFromFile(s: string): HyperParameters {
    analyseStateObserver.next(AnalysisState.READING_HYPERPARAMS);
    const search = 'Using the following hyper\\-parameters\\n\\{[\\s\\S]*\\"term_cond_max_episodes\\"\\: .{0,}\\n\\}';

    const matchArray = s.match(search);
    const hyperParamsString = matchArray[0]
      .replace('Using the following hyper-parameters', '');
    const hyperParams: HyperParameters = JSON.parse(hyperParamsString);

    return hyperParams;
  }

  private getActionSpacesFromFile(s: string): ActionSpace[] {
    analyseStateObserver.next(AnalysisState.READING_ACTIONSPACE);
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

  private getTrainingFiles(files: UnZippedFile[]): UnZippedFile[] {
    return files.filter(value => value.name.endsWith('.log'));
  }

  private getEnviorent(s: UnZippedFile[]): EnvironmentInfo {
    analyseStateObserver.next(AnalysisState.READING_ENVIRONMENTS);
    let name = '';

    for (const f of s) {
      const matchArray = f.readAsString().match('WORLD_NAME: .{0,}');

      if (matchArray != null) {
        name = matchArray[0];
      }
    }

    return new EnvironmentInfo(name.replace('WORLD_NAME: ', ''));
  }

  private getMetrics(metricFile: UnZippedFile): Metric[] {
    analyseStateObserver.next(AnalysisState.READING_METRICS);
    return JSON.parse(metricFile.readAsString()).metrics;
  }
}
