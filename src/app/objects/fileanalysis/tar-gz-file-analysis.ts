import {FileAnalysis} from './file-analysis';
import {RacerData} from './racer-data';
import {GzExtract} from '../../utils/gz-extract';
import {analyseStateObserver, fileUploadedObserver} from '../observer/observers';
import {AnalysisState} from './analysis-state';
import {ReaderFactory} from './readers/reader-factory';

export class TarGzFileAnalysis implements FileAnalysis {

  analysis(file: File): Promise<RacerData> {
    analyseStateObserver.next(AnalysisState.EXTRACTING_FILE);

    try {
      fileUploadedObserver.next(file);

      return GzExtract.extract(file).then(files => {
        const reader = ReaderFactory.getAnalyticReader(files);

        return new RacerData(
          reader.readSteps(),
          reader.readHyperParams(),
          reader.readActionSpaces(),
          reader.readMetrics(),
          reader.readEnvironment(),
        );
      });
    } catch (e) {
      console.log('ERROR!!!');
    }
  }
}
