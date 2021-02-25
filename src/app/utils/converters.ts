import {Step} from '../objects/step';

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
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  }
}
