import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Run} from '../objects/run';
import {HyperParameters} from '../objects/hyper-parameters';
import {ActionSpace} from '../objects/action-space';
import {SimpleFileAnalysisFactory} from '../objects/fileanalysis/simple-file-analysis-factory';
import {RacerData} from '../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileAnalysisFactory = new SimpleFileAnalysisFactory();
  private racerData: RacerData = new EmptyRacerData();

  showingRun: Run;

  constructor(private dataService: DataService,
              private logService: LogService) {
  }

  analysisFile(file: File): Promise<void> {
    try {
      const fileAnalysis = this.fileAnalysisFactory.getFileAnalysis(file);
      const promise = fileAnalysis.analysis(file);

      return promise.then(racerData => {
        this.racerData = racerData;
        this.showingRun = this.getAllRuns()[0];
      });
    } catch (e) {
      this.logService.logError(e);
    }
  }

  public getHyperParameters(): HyperParameters {
    return this.racerData.hyperParams;
  }

  public getActionSpaces(): ActionSpace[] {
    return this.racerData.actionSpaces;
  }


  public switchRun(run: Run): void {
    this.showingRun = run;
  }

  public getShowingRun(): Run {
    return this.showingRun;
  }

  public getAllRuns(): Run[] {
    return this.racerData.runs;
  }
}
