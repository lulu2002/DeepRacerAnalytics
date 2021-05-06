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
    this._steps = steps;
    this._hyperParams = hyperParams;
    this._actionSpaces = actionSpaces;
    this._track = track;

    this._metrics = groupBy(mertics);
    this._allRuns = BestRun.splitRuns(steps, mertics);
  }

  private readonly _steps: Step[];
  private readonly _allRuns: Run[];
  private readonly _metrics: MetricsMap;
  private readonly _hyperParams: HyperParameters;
  private readonly _actionSpaces: ActionSpace[];
  private readonly _track: string;


  get allRuns(): Run[] {
    return [...this._allRuns];
  }


  get steps(): Step[] {
    return [...this._steps];
  }

  get metrics(): MetricsMap {
    return [...this._metrics];
  }

  get hyperParams(): HyperParameters {
    return this._hyperParams;
  }

  get actionSpaces(): ActionSpace[] {
    return [...this._actionSpaces];
  }

  get track(): string {
    return this._track;
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
