import {Step} from '../objects/step';
import {Run} from '../objects/run';

export class BestRun {

  public static getRunsSorted(steps: Step[]): Run[] {
    const runs: Run[] = BestRun.splitRuns(steps);

    runs.sort(a => -this.calcScore(a));

    return runs;
  }

  private static calcScore(run: Run): number {
    let sum = 0;

    const lastStep = run.getLastStep();
    
    sum += lastStep.progress;

    if (lastStep.done) {
      sum += (lastStep.tstamp - run.getFirstStep().tstamp);
    }

    return sum;
  }

  private static splitRuns(steps: Step[]): Run[] {
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
