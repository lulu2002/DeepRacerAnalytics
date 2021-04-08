import {Step} from '../objects/step';
import {Run} from '../objects/run';

export class BestRun {

  public static getRunsSorted(steps: Step[]): Run[] {
    let runs: Run[] = BestRun.splitRuns(steps);

    runs = runs.filter(value => value.getLastStep().progress !== undefined);
    runs.sort((a, b) => this.calcScore(b) - this.calcScore(a));

    return runs;
  }

  public static sortRuns(runs: Run[]): Run[] {

    runs = runs.filter(value => value.getLastStep().progress !== undefined);
    runs.sort((a, b) => this.calcScore(b) - this.calcScore(a));

    return runs;
  }

  private static calcScore(run: Run): number {
    let sum = 0;

    const lastStep = run.getLastStep();

    sum += lastStep.progress;

    if (run.isDone()) {
      sum += ((1 / run.getTimeCost()) * 100);
    }

    return sum;
  }

  public static splitRuns(steps: Step[]): Run[] {
    const runs: Run[] = [];
    let temp: Step[] = [];

    steps.forEach((step, index) => {
      if (step) {
        if (step.steps <= 1.1 && index !== 0) {
          runs.push(new Run(temp));
          temp = [];
        }

        temp.push(step);
      }
    });

    return runs;
  }

}
