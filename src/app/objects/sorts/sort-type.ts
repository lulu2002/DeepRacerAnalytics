import {Run} from '../run';

export type RunSort = (a: Run, b: Run) => number;

export abstract class SortType {
    protected abstract sortAlgorithm: RunSort;

    public abstract getButtonLabel(run: Run): string;

    public sort(runs: Run[]): Run[] {
        return runs.sort(this.sortAlgorithm);
    }
}
