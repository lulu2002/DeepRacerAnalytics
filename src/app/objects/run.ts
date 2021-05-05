import {Step} from './step';
import {Metric} from './metric';

export class Run {
  private readonly steps: Step[];
  private metric: Metric;

  constructor(steps: Step[], metric: Metric) {
    this.steps = steps;
    this.metric = metric;
  }

  public getMetric(): Metric {
    return this.metric;
  }

  public getSteps(): Step[] {
    return [].concat(this.steps);
  }

  public getLastStep(): Step {
    return this.steps[this.steps.length - 1];
  }

  public getFirstStep(): Step {
    return this.steps[0];
  }

  public getTimeCost(): number {
    return this.getLastStep().tstamp - this.getFirstStep().tstamp;
  }

  public isDone(): boolean {
    return this.getLastStep().progress >= 100;
  }
}
