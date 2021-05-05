import {Component, Injectable} from '@angular/core';
import {AnalysisService} from '../../service/analysis.service';
import * as ChartJsChart from 'chart.js';
import {DataService} from '../../service/data.service';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';
import {EpisodeSort, GeneralSort, RewardSort} from '../../objects/sorts/sorts';
import {SortType} from '../../objects/sorts/sort-type';
import {FilterOption} from '../../objects/filters/filter-option';
import {fileAnalyseObserver} from '../../objects/observer/observers';
import {EmptyRacerData} from '../../objects/fileanalysis/empty-racer-data';
import {RacerData} from '../../objects/fileanalysis/racer-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  private showingChart: ChartJsChart;
  showingData: AnalyticData;
  private racerData: RacerData = new EmptyRacerData();

  constructor(public fileService: AnalysisService,
              public dataService: DataService) {

    fileAnalyseObserver.subscribe(racerData => {
      this.racerData = racerData;
    });
  }

  public getData(): Run {
    return this.racerData.allRuns[0];
  }

  public updateChart(data: AnalyticData): void {
    const chart = data.chart;

    this.showingData = data;
    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.showingData.handleData(this.getData().getSteps())));
    this.showingData.chart.afterChartDisplayed(this.showingChart);
  }

  toggleOnlyShowFromStartFilter(): void {
    // this.fileService.runCache = this.fileService.runCache.filter(value =>
    //   value.getFirstStep().episode
    //   % this.fileService.getHyperParameters().num_episodes_between_training === 0);
  }

  toggleFilter(filter: FilterOption): void {
    // const name = filter.constructor.name;
    // const filterNames = this.fileService.filters.map(value => value.constructor.name);
    //
    // const index = filterNames.indexOf(name);
    //
    // if (index > -1) {
    //   this.fileService.filters = this.fileService.filters.slice(index, 1);
    // } else {
    //   this.fileService.filters.push(filter);
    // }


  }

  updateSortType(sortType: SortType): void {
    // this.fileService.sortType = sortType;
    // this.fileService.runCache = BestRun.sortRuns(this.fileService.racerData.allRuns, sortType);
  }

  updateGeneralSort(): void {
    this.updateSortType(new GeneralSort());
  }

  updateRewardSort(): void {
    this.updateSortType(new RewardSort());
  }

  updateEpisodeSort(): void {
    this.updateSortType(new EpisodeSort());
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }
}
