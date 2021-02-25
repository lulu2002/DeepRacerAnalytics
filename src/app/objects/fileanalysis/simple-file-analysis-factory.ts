import {FileAnalysis} from './file-analysis';
import {TarGzFileAnalysis} from './impl/tar-gz-file-analysis';
import {CsvFileAnalysis} from './impl/csv-file-analysis';

export class SimpleFileAnalysisFactory {

  public getFileAnalysis(file: File): FileAnalysis {
    const name = file.name;

    if (name.endsWith('.tar.gz')) {
      return new TarGzFileAnalysis();
    } else if (name.endsWith('.csv')) {
      return new CsvFileAnalysis();
    }
  }

}
