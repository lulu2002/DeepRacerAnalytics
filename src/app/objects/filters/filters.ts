import {FilterOption} from './filter-option';
import {Run} from '../run';
import {RacerData} from '../fileanalysis/racer-data';

export class FromStartFilter extends FilterOption {


  constructor(private racerData: RacerData) {
    super();
  }

  filter(runs: Run[]): Run[] {
    return runs.filter(value => value.getFirstStep().episode % this.racerData.hyperParams.num_episodes_between_training === 0);
  }

}
