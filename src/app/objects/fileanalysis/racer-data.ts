import {HyperParameters} from '../hyper-parameters';
import {ActionSpace} from '../action-space';
import {Step} from '../step';
import {Run} from '../run';
import {BestRun} from '../../utils/best-run';
import {Metric} from '../metric';
import {EnvironmentInfo} from '../environment-info';

type MetricsMap = Metric[][];

export class RacerData {

  constructor(steps: Step[],
              hyperParams: HyperParameters = emptyHyper,
              actionSpaces: ActionSpace[] = [],
              mertics: Metric[] = [],
              environmentInfo: EnvironmentInfo = emptyEnvironment
  ) {
    this._steps = steps;
    this._hyperParams = hyperParams;
    this._actionSpaces = actionSpaces;
    this._environmentInfo = environmentInfo;

    this._metrics = groupBy(mertics);
    this._allRuns = BestRun.splitRuns(steps, mertics);

    this.allRuns.forEach(value => {
      if (isNaN(value.timeCost)) {
        console.log(value);
      }
    });
  }

  private readonly _steps: Step[];
  private readonly _allRuns: Run[];
  private readonly _metrics: MetricsMap;
  private readonly _hyperParams: HyperParameters;
  private readonly _actionSpaces: ActionSpace[];
  private readonly _environmentInfo: EnvironmentInfo;


  get allRuns(): Run[] {
    return [...this._allRuns];
  }


  get steps(): Step[] {
    return [...this._steps];
  }

  get stepsSource(): Step[] {
    return this._steps;
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
    return this._environmentInfo.track;
  }

  get modelName(): string {
    return this._environmentInfo.modelName;
  }

  get carName(): string {
    return this._environmentInfo.carName;
  }

  public clone(): RacerData {
    return Object.assign({}, this);
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

const emptyEnvironment = new EnvironmentInfo('reinvent_base', 'Empty', 'Empty');
const emptyHyper: HyperParameters = {
  batch_size: -1,
  beta_entropy: -1,
  discount_factor: -1,
  e_greedy_value: -1,
  epsilon_steps: -1,
  exploration_type: '',
  loss_type: '',
  lr: -1,
  num_episodes_between_training: -1,
  num_epochs: -1,
  stack_size: -1,
  term_cond_avg_score: -1,
  term_cond_max_episodes: -1,
};
