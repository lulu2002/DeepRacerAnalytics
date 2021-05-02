import {Injectable} from '@angular/core';
import {Run} from '../objects/run';
import {HyperParameters} from '../objects/hyper-parameters';
import {ActionSpace} from '../objects/action-space';
import {SimpleFileAnalysisFactory} from '../objects/fileanalysis/simple-file-analysis-factory';
import {RacerData} from '../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {LogService} from './log.service';
import {Metric} from '../objects/metric';
import {BestRun} from '../utils/best-run';
import {SortType} from '../objects/sorts/sort-type';
import {GeneralSort} from '../objects/sorts/sorts';
import {Step} from '../objects/step';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private logService: LogService) {
  }

  public static racerData: RacerData = new EmptyRacerData();

  private fileAnalysisFactory = new SimpleFileAnalysisFactory();

  runCache: Run[];
  showingRun: Run;
  sortType: SortType = new GeneralSort();

  public static getMetrics(step: Step): Metric[] {
    console.log(this.racerData.metrics);
    const metrics = this.racerData.metrics.get(+step.episode + 1);
    return metrics;
  }

  public static getMetric(step: Step): Metric {
    const metrics = this.getMetrics(step);
    return metrics[metrics.length - 1];
  }

  analysisFile(file: File): Promise<void> {
    try {
      const fileAnalysis = this.fileAnalysisFactory.getFileAnalysis(file);
      const promise = fileAnalysis.analysis(file);

      return promise.then(racerData => {
        FileService.racerData = racerData;
        this.runCache = BestRun.sortRuns(racerData.allRuns, new GeneralSort());
        this.showingRun = this.getRunsSorted()[0];
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

  public getRunsSorted(): Run[] {
    return this.runCache;
  }

  public getAllRunsIsEvaluation(): Run[] {
    return this.getRunsSorted().filter(value => {
      return FileService.getMetrics(value.getFirstStep()).filter(value1 => value1.phase === 'evaluation').length >= 1;
    });
  }

  public getAllRunsNoSort(): Run[] {
    return FileService.racerData.allRuns;
  }
}
