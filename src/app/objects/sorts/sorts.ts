import {Run} from '../run';
import {FileService} from '../../service/file.service';

export const rewardSort: RunSort = (a, b) =>
  FileService.getMetric(b.getFirstStep().episode).reward_score - FileService.getMetric(a.getFirstStep().episode).reward_score;

export const generalSort: RunSort = (a, b) => a.getTimeCost();

export type RunSort = (a: Run, b: Run) => number;
