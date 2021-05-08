import {Injectable} from '@angular/core';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {chartDisplayObserver, fileAnalyseObserver} from '../objects/observer/observers';
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
  private _showingRun: Run = emptyRun;
  private _filterOptions: FilterOption[] = [];
  private _sortType: SortType = SortTypes.GENERAL_SORT;


  constructor() {
    fileAnalyseObserver.subscribe(value => {
      this.racerData = value;
      this.onAnalysed();
      chartDisplayObserver.next(this.racerData);
    });
  }

  private onAnalysed(): void {
    this._runsCache = this.racerData.allRuns;

    this.toggleDefaultOptions();

    this.updateCacheSort();
    this.updateCacheFilter();

    if (this.runsCache.length > 0) {
      this._showingRun = this.runsCache[0];
    }
  }

  private toggleDefaultOptions(): void {
    this._filterOptions.push(Filters.FROM_START_FILTER);
  }

  public changeSortType(sortType: SortType): void {
    this._sortType = sortType;
    this.updateCacheSort();
    this.updateCacheFilter();
  }

  public updateCacheSort(): void {
    this._runsCache = this._sortType.sort(this.racerData.allRuns);
    this._runsCacheFilterBackup = [...this._runsCache];
  }

  public updateCacheFilter(): void {
    let all = [...this._runsCacheFilterBackup];

    this._filterOptions.forEach(filter => {
      all = filter.filter(all, this.racerData);
    });

    this._runsCache = all;
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

  get runsCache(): Run[] {
    return this._runsCache;
  }

  get showingRun(): Run {
    return this._showingRun;
  }

  get sortType(): SortType {
    return this._sortType;
  }


  set showingRun(value: Run) {
    this._showingRun = value;
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
