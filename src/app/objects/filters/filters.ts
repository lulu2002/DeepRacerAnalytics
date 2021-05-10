import {FilterOption} from './filter-option';
import {Run} from '../run';
import {RacerData} from '../fileanalysis/racer-data';


class FromStartFilter extends FilterOption {

  filter(runs: Run[], racerData: RacerData): Run[] {
    return runs.filter(value => value.getFirstStep().episode % racerData.hyperParams.num_episodes_between_training === 0);
  }

}

class OnlyCompleteFilter extends FilterOption {
  filter(runs: Run[], racerData: RacerData): Run[] {
    return runs.filter(value => value.isDone);
  }

}

export class Filters {
  public static readonly FROM_START = new FromStartFilter();
  public static readonly ONLY_COMPLETE = new OnlyCompleteFilter();
}
