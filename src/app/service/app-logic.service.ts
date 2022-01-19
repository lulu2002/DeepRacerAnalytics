import {Injectable} from '@angular/core';
import App from '../../logic/App';
import AnalysisResult from '../../logic/data-objects/AnalysisResult';

@Injectable({
  providedIn: 'root'
})
export class AppLogicService {

  private app = new App();

  constructor() {
  }

  upload(tarGzFile: File): Promise<AnalysisResult> {
    return this.app.upload(tarGzFile);
  }
}
