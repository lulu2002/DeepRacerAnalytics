import {FileAnalysis} from './file-analysis';
import {TarGzFileAnalysis} from './impl/tar-gz-file-analysis';

export class SimpleFileAnalysisFactory {

  public getFileAnalysis(file: File): FileAnalysis {
    const name = file.name;

    if (name.endsWith('.tar.gz')) {
      return new TarGzFileAnalysis();
    }

    throw new Error('無效的檔案類型');
  }

}
