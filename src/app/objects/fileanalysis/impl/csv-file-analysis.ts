import {FileAnalysis} from '../file-analysis';
import {RacerData} from '../racer-data';
import {Converters} from '../../../utils/converters';

export class CsvFileAnalysis implements FileAnalysis {

  analysis(file: File): Promise<RacerData> {
    return file.text().then(value => {
      const steps = Converters.convertCsvToSteps(value);

      return new RacerData(steps, emptyHyper, [], [], emptyEnvironment, trainingType);
    });
  }

}
