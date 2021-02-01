import {Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private csvString: string;
  private json: string[];

  constructor(private dataService: DataService) {
  }

  public updateFileContents(csvString: string): void {
    this.csvString = csvString;
    this.json = this.convertCsvToJson(csvString);
    this.dataService.getAllData().forEach(data => data.handleData(this.json));
  }

  public getJson(): string[] {
    return this.json;
  }

  private convertCsvToJson(csv: string): string[] {
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
