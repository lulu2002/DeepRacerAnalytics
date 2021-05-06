import {Component, Injectable} from '@angular/core';
import * as ChartJsChart from 'chart.js';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';
import {SortTypes} from '../../objects/sorts/sorts';
import {ChartDisplayService} from '../../service/chart-display.service';
import {DataService} from '../../service/data.service';
import {FromStartFilter} from '../../objects/filters/filters';
import {RacerData} from '../../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../../objects/fileanalysis/empty-racer-data';
import {chartDisplayObserver} from '../../objects/observer/observers';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  private racerData: RacerData = new EmptyRacerData();
  private showingChart: ChartJsChart;
  public sortTypes = SortTypes;
  showingData: AnalyticData;

  constructor(public displayService: ChartDisplayService,
              private dataService: DataService) {

    chartDisplayObserver.subscribe(value => {
      this.racerData = value;
      this.updateChart(dataService.getData('xy'));
    });
  }

  public getData(): Run {
    return this.displayService.showingRun;
  }

  public updateChart(data: AnalyticData): void {
    this.showingData = data;
    this.reRenderChart();
  }

  public switchRun(run: Run): void {
    this.displayService.showingRun = run;
    this.reRenderChart();
  }

  private reRenderChart(): void {
    const chart = this.showingData.chart;

    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');

    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.showingData.handleData(this.getData().getSteps())));
    this.showingData.chart.afterChartDisplayed(this.showingChart);
  }

  updateGeneralSort(): void {
    this.displayService.changeSortType(SortTypes.GENERAL_SORT);
  }

  updateRewardSort(): void {
    this.displayService.changeSortType(SortTypes.REWARD_SORT);
  }

  updateEpisodeSort(): void {
    this.displayService.changeSortType(SortTypes.EPISODE_SORT);
  }

  toggleFromStartFilter(): void {
    this.displayService.toggleFilter(new FromStartFilter(this.racerData));
  }

  getAllData(): AnalyticData[] {
    return this.dataService.getAllData();
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }
}
