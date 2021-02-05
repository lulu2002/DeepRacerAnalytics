import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Step} from '../objects/step';
import {BestRun} from '../utils/best-run';
import {Run} from '../objects/run';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private showingRun: Run;
  private allRuns: Run[];

  constructor(private dataService: DataService) {
  }

  public updateFileContents(csvString: string): void {
    const allSteps: Step[] = this.convertCsvToSteps(csvString);
    this.allRuns = BestRun.getRunsSorted(allSteps);

    this.allRuns.forEach(run => {
      this.dataService.getAllData().forEach(data => data.handleData(run.getSteps()));
    });
    this.showingRun = this.allRuns[0];
  }

  public switchRun(run: Run): void {
    this.showingRun = run;
  }

  public getShowingRun(): Run {
    return this.showingRun;
  }

  public getAllRuns(): Run[] {
    return this.allRuns;
  }

  private convertCsvToSteps(csv: string): Step[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  }
}
