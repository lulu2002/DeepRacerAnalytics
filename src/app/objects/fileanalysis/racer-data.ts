import {HyperParameters} from '../hyper-parameters';
import {ActionSpace} from '../action-space';
import {Step} from '../step';
import {Run} from '../run';
import {BestRun} from '../../utils/best-run';
import {Metric} from '../metric';

type MetricsMap = Metric[][];

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

    this.metrics = groupBy(mertics);
    this._allRuns = BestRun.splitRuns(steps, mertics);
  }

  steps: Step[];
  private readonly _allRuns: Run[];
  metrics: MetricsMap;
  hyperParams: HyperParameters;
  actionSpaces: ActionSpace[];
  track: string;


  get allRuns(): Run[] {
    return [...this._allRuns];
  }
}

function groupBy(list: Metric[]): MetricsMap {
  const map: MetricsMap = [];

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < list.length; i++) {
    map.push([][0]);
  }

  list.forEach((item) => {
    const key = item.episode;
    const coll = map[key];

    if (coll == null) {
      map[key] = [];
    }

    map[key].push(item);
  });

  return map.filter(value => value !== undefined);
}
