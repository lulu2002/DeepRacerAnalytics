import {RunSort, SortType} from './sort-type';
import {Run} from '../run';

class GeneralSort extends SortType {
    sortAlgorithm: RunSort = (a, b) => this.calcScore(b) - this.calcScore(a);

    getButtonLabel(run: Run): string {
        return `${run.timeCost.toFixed(2)}s - ${(run.isDone ? '完成' : '未完成')}`;
    }


    private calcScore(run: Run): number {
        let sum = 0;

        const lastStep = run.getLastStep();

        sum += lastStep.progress;

        if (run.isDone) {
            sum += ((1 / run.timeCost) * 100);
        }

        return sum;
    }
}

class RewardSort extends SortType {
    sortAlgorithm: RunSort = (a, b) => this.calcAllScore(b) - this.calcAllScore(a);

    getButtonLabel(run: Run): string {
        return `${this.calcAllScore(run).toFixed(0)}分 - ${(run.isDone ? '完成' : '未完成')}`;
    }

    calcAllScore(run: Run): number {
        return run.reward;
    }
}

class EpisodeSort extends SortType {
    sortAlgorithm: RunSort = (a, b) => a.getLastStep().episode - b.getLastStep().episode;

    getButtonLabel(run: Run): string {
        return `第 ${run.getLastStep().episode} 次嘗試`;
    }

}


export class SortTypes {
    public static readonly GENERAL_SORT = new GeneralSort();
    public static readonly REWARD_SORT = new RewardSort();
    public static readonly EPISODE_SORT = new EpisodeSort();
}
