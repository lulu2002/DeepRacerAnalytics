import {FilterOption} from './filter-option';
import {Run} from '../run';
import {AnalysisService} from '../../service/analysis.service';

export class FromStartFilter extends FilterOption {

  filter(runs: Run[]): Run[] {
    return runs.filter(value => value.getFirstStep().episode % AnalysisService.racerData.hyperParams.num_episodes_between_training === 0);
  }

}
