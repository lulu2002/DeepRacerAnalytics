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
import {RunSort, SortType} from '../objects/sorts/sort-type';
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

  public static getMetric(step: Step): Metric {

    // 明明有些 length 為 8，怎麼輸出是 1
    const metrics = this.racerData.metrics.get(+step.episode + +1);
    console.log(metrics.length);
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
    return this.getRunsSorted().filter(value => FileService.getMetric(value.getFirstStep()).phase === 'evaluation');
  }

  public getAllRunsNoSort(): Run[] {
    return FileService.racerData.allRuns;
  }
}
