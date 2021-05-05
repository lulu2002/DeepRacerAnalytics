import {Run} from '../run';

export abstract class FilterOption {
  abstract filter(runs: Run[]): Run[];
}
