import {Injectable} from '@angular/core';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {fileAnalyseObserver, firstChartDisplayObserver, runCacheUpdateObserver} from '../objects/observer/observers';
import {Run} from '../objects/run';
import {FilterOption} from '../objects/filters/filter-option';
import {SortType} from '../objects/sorts/sort-type';
import {SortTypes} from '../objects/sorts/sorts';
import {Filters} from '../objects/filters/filters';

@Injectable({
  providedIn: 'root'
})
export class ChartDisplayService {

  private racerData = new EmptyRacerData();
  private _runsCache: Run[] = [];
  private _runsCacheFilterBackup: Run[] = [];
  private _showingRuns: Run[] = [emptyRun];
  private _filterOptions: FilterOption[] = [];
  private _sortType: SortType = SortTypes.GENERAL_SORT;


  constructor() {
    fileAnalyseObserver.subscribe(value => {
      this.racerData = value;
      this.onAnalysed();
      this.clearShowingRuns();
      firstChartDisplayObserver.next(this.racerData);
    });
  }

  private onAnalysed(): void {
    this.runsCache = this.racerData.allRuns;

    this.toggleDefaultOptions();

    this.updateCacheSort();
    this.updateCacheFilter();

    if (this.runsCache.length > 0) {
      this.changeRun(this.runsCache[0]);
    }
  }

  private toggleDefaultOptions(): void {
    this._filterOptions.push(Filters.FROM_START);
    this._filterOptions.push(Filters.ONLY_COMPLETE);
  }

  public changeSortType(sortType: SortType): void {
    this._sortType = sortType;
    this.updateCacheSort();
    this.updateCacheFilter();
  }

  public updateCacheSort(): void {
    this.runsCache = this._sortType.sort(this.racerData.allRuns);
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

  public changeRun(run: Run): void {
    this.clearShowingRuns();
    this._showingRuns.push(run);
  }

  public addRuns(run: Run[]): void {
    this._showingRuns.push(...run);
  }

  public removeRun(toRemove: Run[]): void {
    this._showingRuns = this._showingRuns.filter(value => !toRemove.includes(value));
  }

  public clearShowingRuns(): void {
    this._showingRuns = [];
  }

  get runsCache(): Run[] {
    return this._runsCache;
  }

  get showingRuns(): Run[] {
    return this._showingRuns;
  }

  get sortType(): SortType {
    return this._sortType;
  }

  set runsCache(value: Run[]) {
    this._runsCache = value;
    runCacheUpdateObserver.next(this.runsCache);
  }

  get filterOptions(): FilterOption[] {
    return this._filterOptions;
  }
}

const emptyRun = new Run([], {
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
