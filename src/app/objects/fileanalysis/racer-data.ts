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
    this.metrics = mertics;

    this.runsNoSort = BestRun.splitRuns(steps);
    this.runs = BestRun.sortRuns(this.runsNoSort);
  }

  steps: Step[];
  runsNoSort: Run[];
  metrics: Metric[];
  runs: Run[];
  hyperParams: HyperParameters;
  actionSpaces: ActionSpace[];
  track: string;
}
