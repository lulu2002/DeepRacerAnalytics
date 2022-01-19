import {Episode} from '../run';
import {AnalysisResult} from '../fileanalysis/racer-data';

export abstract class FilterOption {
    abstract filter(runs: Episode[], racerData: AnalysisResult): Episode[];
}
