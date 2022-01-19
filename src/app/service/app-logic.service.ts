import {Injectable} from '@angular/core';
import App from '../../logic/App';

@Injectable({
  providedIn: 'root'
})
export class AppLogicService {

  private app = new App();

  constructor() {
  }

  upload(tarGzFile: File): void {
    this.app.upload(tarGzFile);
  }
}
