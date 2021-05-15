import {Step} from '../objects/step';
import {isNumber} from '@ng-bootstrap/ng-bootstrap/util/util';

export class Converters {

  public static convertBlobToFile(blob: Blob, fileName: string): File {

    const file = blob as any;
    file.name = fileName;
    file.lastModifiedDate = new Date();

    return file as File;
  }

  public static convertCsvToSteps(csv: string): Step[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        const s = currentLine[j];
        const sNum = +s;

        if (!isNaN(sNum)) {
          obj[headers[j]] = sNum;
        } else {
          obj[headers[j]] = s;
        }
      }

      result.push(obj as Step);
    }

    return result;
  }
}
