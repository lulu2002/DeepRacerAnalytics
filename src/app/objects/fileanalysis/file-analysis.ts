import {RacerData} from './racer-data';

export interface FileAnalysis {

    analysis(file: File): Promise<RacerData>;

}
