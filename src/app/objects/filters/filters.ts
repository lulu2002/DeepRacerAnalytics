import {FilterOption} from './filter-option';
import {Run} from '../run';
import {RacerData} from '../fileanalysis/racer-data';


class FromStartFilter extends FilterOption {

  filter(runs: Run[], racerData: RacerData): Run[] {
    return runs.filter(value => value.getFirstStep().episode % racerData.hyperParams.num_episodes_between_training === 0);
  }

}

export class Filters {
  public static readonly FROM_START_FILTER = new FromStartFilter();
}
