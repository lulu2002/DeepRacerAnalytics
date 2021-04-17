import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Run} from '../objects/run';
import {HyperParameters} from '../objects/hyper-parameters';
import {ActionSpace} from '../objects/action-space';
import {SimpleFileAnalysisFactory} from '../objects/fileanalysis/simple-file-analysis-factory';
import {RacerData} from '../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {LogService} from './log.service';
import {Metric} from '../objects/metric';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private logService: LogService) {
  }

  public static racerData: RacerData = new EmptyRacerData();

  private fileAnalysisFactory = new SimpleFileAnalysisFactory();


  showingRun: Run;

  public static getMetric(index: number): Metric {
    return this.racerData.metrics[index];
  }

  analysisFile(file: File): Promise<void> {
    try {
      const fileAnalysis = this.fileAnalysisFactory.getFileAnalysis(file);
      const promise = fileAnalysis.analysis(file);

      return promise.then(racerData => {
        FileService.racerData = racerData;
        this.showingRun = this.getAllRuns()[0];
      });
    } catch (e) {
      this.logService.logError(e);
    }
  }

  public getHyperParameters(): HyperParameters {
    return FileService.racerData.hyperParams;
  }

  public getActionSpaces(): ActionSpace[] {
    return FileService.racerData.actionSpaces;
  }


  public switchRun(run: Run): void {
    this.showingRun = run;
  }

  public getShowingRun(): Run {
    return this.showingRun;
  }

  public getAllRuns(): Run[] {
    return FileService.racerData.runs;
  }

  public getAllRunsIsEvaluation(): Run[] {
    return this.getAllRuns().filter(value => FileService.getMetric(value.getFirstStep().episode).phase === 'evaluation');
  }

  public getAllRunsNoSort(): Run[] {
    return FileService.racerData.runsNoSort;
  }
}
