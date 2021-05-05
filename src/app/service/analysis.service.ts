import {Injectable} from '@angular/core';
import {SimpleFileAnalysisFactory} from '../objects/fileanalysis/simple-file-analysis-factory';
import {RacerData} from '../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {LogService} from './log.service';
import {fileAnalyseObserver} from '../objects/observer/observers';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private racerData: RacerData = new EmptyRacerData();
  private fileAnalysisFactory = new SimpleFileAnalysisFactory();

  constructor(private logService: LogService) {
  }

  analysisFile(file: File): Promise<void> {
    try {
      const fileAnalysis = this.fileAnalysisFactory.getFileAnalysis(file);
      const promise = fileAnalysis.analysis(file);

      return promise.then(racerData => {
        this.racerData = racerData;
        fileAnalyseObserver.next(this.racerData);
      });
    } catch (e) {
      this.logService.logError(e);
    }
  }
}
