import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Step} from '../objects/step';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private csvString: string;
  private steps: Step[];

  constructor(private dataService: DataService) {
  }

  public updateFileContents(csvString: string): void {
    this.csvString = csvString;
    this.steps = this.convertCsvToSteps(csvString);
    this.dataService.getAllData().forEach(data => data.handleData(this.steps));
  }

  public getSteps(): Step[] {
    return this.steps;
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