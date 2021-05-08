import {Injectable} from '@angular/core';
import {SimpleFileAnalysisFactory} from '../objects/fileanalysis/simple-file-analysis-factory';
import {RacerData} from '../objects/fileanalysis/racer-data';
import {LogService} from './log.service';
import {analyseStateObserver} from '../objects/observer/observers';
import {AnalysisState} from '../objects/fileanalysis/analysis-state';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private fileAnalysisFactory = new SimpleFileAnalysisFactory();

  constructor(private logService: LogService) {
  }

  analysisFile(file: File): Promise<RacerData> {
    try {
      const fileAnalysis = this.fileAnalysisFactory.getFileAnalysis(file);
      const promise = fileAnalysis.analysis(file);
      return promise.then(value => {
        return value;
      });
    } catch (e) {
      analyseStateObserver.next(AnalysisState.ERROR);
      this.logService.logError(e);
    }
  }
}
