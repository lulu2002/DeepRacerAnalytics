import {Step} from '../objects/step';

export class BestRun {

  public static getBestRun(json: Step[]): Step {
    const runs: any[] = BestRun.splitRuns(json);

    return null;
  }

  private static splitRuns(json: Step[]): Step[] {
    const runStartIndexes: number[] = [];

    return [];
  }

}
