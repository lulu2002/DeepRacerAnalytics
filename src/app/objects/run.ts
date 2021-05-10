import {Step} from './step';
import {Metric} from './metric';

export class Run {
  private readonly _steps: Step[];
  private metric: Metric;

  constructor(steps: Step[], metric: Metric) {
    this._steps = steps;
    this.metric = metric;
  }

  public getMetric(): Metric {
    return this.metric;
  }

  public getLastStep(): Step {
    return this._steps[this._steps.length - 1];
  }

  public getFirstStep(): Step {
    return this._steps[0];
  }

  get isDone(): boolean {
    return this.getLastStep().progress >= 100;
  }

  get steps(): Step[] {
    return [...this._steps];
  }

  get timeCost(): number {
    return this.getLastStep().tstamp - this.getFirstStep().tstamp;
  }
}
