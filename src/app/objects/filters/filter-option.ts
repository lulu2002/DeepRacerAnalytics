import {Run} from '../run';
import {RacerData} from '../fileanalysis/racer-data';

export abstract class FilterOption {
    abstract filter(runs: Run[], racerData: RacerData): Run[];
}
