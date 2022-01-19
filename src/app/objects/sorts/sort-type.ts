import Episode from '../../../logic/data-objects/Episode';

export type EpisodeSort = (a: Episode, b: Episode) => number;

export abstract class SortType {
    protected abstract sortAlgorithm: EpisodeSort;

    public abstract getButtonLabel(run: Episode): string;

    public sort(runs: Episode[]): Episode[] {
        return runs.sort(this.sortAlgorithm);
    }
}
