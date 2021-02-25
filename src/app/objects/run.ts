import {Step} from './step';

export class Run {
  private readonly steps: Step[];

  constructor(steps: Step[]) {
    this.steps = steps;
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
