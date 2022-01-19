import UnZippedFile from '../data-objects/UnZippedFile';
import {LeaderboardAnalyticReader, TrainingAnalyticReader} from '../readers/readers';
import AnalyticReader from '../readers/analytic-reader';

class ReadingManager {

    loadReader(files: UnZippedFile[]): AnalyticReader {
        const fileNames = files.map(value => value.name);

        if (this.containsCsvFiles(fileNames)) {
            return new TrainingAnalyticReader(files);
        } else {
            return new LeaderboardAnalyticReader(files);
        }
    }

    private containsCsvFiles(fileNames: string[]): boolean {
        return fileNames.filter(value => value.endsWith('.csv')).length >= 1;
    }
}

export default ReadingManager;
