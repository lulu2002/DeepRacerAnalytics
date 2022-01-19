import {Injectable} from '@angular/core';
import {fileAnalyseObserver, firstChartDisplayObserver, runCacheUpdateObserver} from '../objects/observer/observers';

import {FilterOption} from '../objects/filters/filter-option';
import {SortType} from '../objects/sorts/sort-type';
import {SortTypes} from '../objects/sorts/sorts';
import {Filters} from '../objects/filters/filters';
import Episode from '../../logic/data-objects/Episode';

@Injectable({
    providedIn: 'root'
})
export class ChartDisplayService {

    private racerData = new EmptyAnalysisResult();
    private _runsCacheFilterBackup: Episode[] = [];

    constructor() {
        fileAnalyseObserver.subscribe(value => {
            this.racerData = value;
            this.onAnalysed();
            this.clearShowingEpisodes();
            firstChartDisplayObserver.next(this.racerData);
        });
    }

    private _runsCache: Episode[] = [];

    get runsCache(): Episode[] {
        return this._runsCache;
    }

    set runsCache(value: Episode[]) {
        this._runsCache = value;
        runCacheUpdateObserver.next(this.runsCache);
    }

    private _showingEpisodes: Episode[] = [emptyEpisode];

    get showingEpisodes(): Episode[] {
        return this._showingEpisodes;
    }

    private _filterOptions: FilterOption[] = [];

    get filterOptions(): FilterOption[] {
        return this._filterOptions;
    }

    private _sortType: SortType = SortTypes.GENERAL_SORT;

    get sortType(): SortType {
        return this._sortType;
    }

    public changeSortType(sortType: SortType): void {
        this._sortType = sortType;
        this.updateCacheSort();
        this.updateCacheFilter();
    }

    public updateCacheSort(): void {
        this.runsCache = this._sortType.sort(this.racerData.allEpisodes);
        this._runsCacheFilterBackup = [...this._runsCache];
    }

    public updateCacheFilter(): void {
        let all = [...this._runsCacheFilterBackup];

        this._filterOptions.forEach(filter => {
            all = filter.filter(all, this.racerData);
        });

        this.runsCache = all;
    }

    public toggleFilter(filter: FilterOption): void {
        const index = this._filterOptions.indexOf(filter);

        if (index > -1) {
            this._filterOptions = this._filterOptions.filter((value, index1) => index1 !== index);
        } else {
            this._filterOptions.push(filter);
        }

        this.updateCacheFilter();
    }

    public changeEpisode(run: Episode): void {
        this.clearShowingEpisodes();
        this._showingEpisodes.push(run);
    }

    public addEpisodes(run: Episode[]): void {
        this._showingEpisodes.push(...run);
    }

    public removeEpisode(toRemove: Episode[]): void {
        this._showingEpisodes = this._showingEpisodes.filter(value => !toRemove.includes(value));
    }

    public clearShowingEpisodes(): void {
        this._showingEpisodes = [];
    }

    private onAnalysed(): void {
        this.runsCache = this.racerData.allEpisodes;

        this.toggleDefaultOptions();

        this.updateCacheSort();
        this.updateCacheFilter();

        if (this.runsCache.length > 0) {
            this.changeEpisode(this.runsCache[0]);
        }
    }

    private toggleDefaultOptions(): void {
        this._filterOptions.push(Filters.FROM_START);
        this._filterOptions.push(Filters.ONLY_COMPLETE);
    }
}

const emptyEpisode = new Episode([], {
    elapsed_time_in_milliseconds: 0,
    episode: -1,
    phase: 'training',
    start_time: 0,
    reward_score: 0,
    completion_percentage: 0,
    episode_status: '',
    metric_time: 0,
    trial: 0
});
