import {Injectable} from '@angular/core';
import {EmptyRacerData} from '../objects/fileanalysis/empty-racer-data';
import {chartDisplayObserver, fileAnalyseObserver} from '../objects/observer/observers';
import {Run} from '../objects/run';
import {FilterOption} from '../objects/filters/filter-option';
import {SortType} from '../objects/sorts/sort-type';
import {GeneralSort} from '../objects/sorts/sorts';

@Injectable({
  providedIn: 'root'
})
export class ChartDisplayService {

  private racerData = new EmptyRacerData();
  private _runsCache: Run[] = [];
  private _showingRun: Run;
  private filterOptions: FilterOption[] = [];
  private _sortType: SortType = new GeneralSort();


  constructor() {
    fileAnalyseObserver.subscribe(value => {
      this.racerData = value;
      this.onAnalysed();
      chartDisplayObserver.next(this.racerData);
    });
  }

  private onAnalysed(): void {
    this._runsCache = this.racerData.allRuns;
    this.updateCacheSort();
    this.updateCacheFilter();
    this._showingRun = this.runsCache[0];
  }

  public changeSortType(sortType: SortType): void {
    this._sortType = sortType;
    this.updateCacheSort();
  }

  public updateCacheSort(): void {
    this._runsCache = this._sortType.sort(this._runsCache);
  }

  public updateCacheFilter(): void {
    this.filterOptions.forEach(filter => {
      this._runsCache = filter.filter(this._runsCache);
    });
  }

  public toggleFilter(filter: FilterOption): void {
    const name = filter.constructor.name;
    const filterNames = this.filterOptions.map(value => value.constructor.name);

    const index = filterNames.indexOf(name);

    if (index > -1) {
      this.filterOptions = this.filterOptions.slice(index, 1);
    } else {
      this.filterOptions.push(filter);
    }
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
}
