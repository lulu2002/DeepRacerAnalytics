import {RunSort, SortType} from './sort-type';
import {Run} from '../run';
import {FileService} from '../../service/file.service';

export class GeneralSort extends SortType {
  sortAlgorithm: RunSort = (a, b) => this.calcScore(b) - this.calcScore(a);

  getButtonLabel(run: Run): string {
    return `${run.getTimeCost().toFixed(2)}s - ${(run.isDone() ? '完成' : '未完成')}`;
  }


  private calcScore(run: Run): number {
    let sum = 0;

    const lastStep = run.getLastStep();

    sum += lastStep.progress;

    if (run.isDone()) {
      sum += ((1 / run.getTimeCost()) * 100);
    }

    return sum;
  }
}

export class RewardSort extends SortType {
  sortAlgorithm: RunSort = (a, b) => this.calcAllScore(b) - this.calcAllScore(a);

  getButtonLabel(run: Run): string {
    return `${this.calcAllScore(run).toFixed(0)}分 - ${(run.isDone() ? '完成' : '未完成')}`;
  }

  calcAllScore(run: Run): number {
    return FileService.getMetric(run.getFirstStep()).reward_score;
  }
}
