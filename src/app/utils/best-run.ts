import {Step} from '../objects/step';

export class BestRun {

  public static getBestRun(steps: Step[]): Step[] {
    const runs: Step[][] = BestRun.splitRuns(steps);

    runs.sort(a => this.calcScore(a));

    return runs[0];
  }

  private static calcScore(steps: Step[]): number {
    let sum = 0;

    // todo 要更細緻
    sum += steps[steps.length - 1].progress;

    return sum;
  }

  private static splitRuns(steps: Step[]): Step[][] {
    const runs: Step[][] = [];
    let temp: Step[] = [];

    steps.forEach((step, index) => {
      if (step) {
        if (step.steps <= 1.1 && index !== 0) {
          runs.push(temp);
          temp = [];
        }

        temp.push(step);
      }
    });

    return runs;
  }

}
