import {FilterOption} from './filter-option';
import Episode from '../../../logic/data-objects/Episode';
import AnalysisResult from '../../../logic/data-objects/AnalysisResult';


class FromStartFilter extends FilterOption {

    filter(episodes: Episode[], analysisResult: AnalysisResult): Episode[] {

        if (analysisResult.environmentInfo.JOB_TYPE === 'EVALUATION') {
            return episodes;
        }

        return episodes.filter(value => value.getFirstStep().episode % analysisResult.hyperParams.num_episodes_between_training === 0);
    }

}

class OnlyCompleteFilter extends FilterOption {
    filter(episodes: Episode[], analysisResult: AnalysisResult): Episode[] {
        return episodes.filter(value => value.isDone);
    }

}

export class Filters {
    public static readonly FROM_START = new FromStartFilter();
    public static readonly ONLY_COMPLETE = new OnlyCompleteFilter();
}
