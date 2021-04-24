import {HyperParameters} from '../hyper-parameters';
import {ActionSpace} from '../action-space';
import {Step} from '../step';
import {Run} from '../run';
import {BestRun} from '../../utils/best-run';
import {Metric} from '../metric';

export class RacerData {

  constructor(steps: Step[],
              hyperParams: HyperParameters = null,
              actionSpaces: ActionSpace[] = [],
              mertics: Metric[] = [],
              track: string = ''
  ) {
    this.steps = steps;
    this.hyperParams = hyperParams;
    this.actionSpaces = actionSpaces;
    this.track = track;

    this.allRuns = BestRun.splitRuns(steps);
    this.metrics = groupBy(mertics);
  }

  steps: Step[];
  allRuns: Run[];
  metrics: Map<number, Metric[]>;
  hyperParams: HyperParameters;
  actionSpaces: ActionSpace[];
  track: string;

}

function groupBy(list: Metric[]): Map<number, Metric[]> {
  const map: Map<number, Metric[]> = new Map<number, Metric[]>();
  list.forEach((item) => {
    const key = item.episode;
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
}
