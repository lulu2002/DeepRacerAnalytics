import {Step} from '../objects/step';
import {Run} from '../objects/run';
import {SortType} from '../objects/sorts/sort-type';
import {Metric} from '../objects/metric';

export class BestRun {
  public static sortRuns(runs: Run[], sortType: SortType): Run[] {
    runs = runs.filter(value => value.getLastStep().progress !== undefined);
    runs = sortType.sort(runs);

    return runs;
  }

  public static splitRuns(steps: Step[], metrics: Metric[]): Run[] {
    const runs: Run[] = [];
    let temp: Step[] = [];

    steps.forEach((step, index) => {
      if (step) {
        if (step.steps <= 1.1 && index !== 0) {
          runs.push(new Run(temp, metrics[step.episode]));
          temp = [];
        }

        temp.push(step);
      }
    });

    return runs;
  }

}
