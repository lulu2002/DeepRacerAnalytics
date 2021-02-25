import {HyperParameters} from '../hyper-parameters';
import {ActionSpace} from '../action-space';
import {Step} from '../step';
import {Run} from '../run';
import {BestRun} from '../../utils/best-run';

export class RacerData {

  constructor(steps: Step[], hyperParams: HyperParameters, actionSpaces: ActionSpace[]) {
    this.steps = steps;
    this.hyperParams = hyperParams;
    this.actionSpaces = actionSpaces;

    this.runs = BestRun.getRunsSorted(steps);
  }

  steps: Step[];
  runs: Run[];
  hyperParams: HyperParameters;
  actionSpaces: ActionSpace[];
}
