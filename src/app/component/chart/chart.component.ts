import {Component, Injectable} from '@angular/core';
import {FileService} from '../../service/file.service';
import * as ChartJsChart from 'chart.js';
import {DataService} from '../../service/data.service';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';
import {GeneralSort, RewardSort} from '../../objects/sorts/sorts';
import {SortType} from '../../objects/sorts/sort-type';
import {BestRun} from '../../utils/best-run';

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

  constructor(public fileService: FileService,
              public dataService: DataService) {
  }

  public getData(): Run {
    return this.fileService.getShowingRun();
  }

  public updateChart(data: AnalyticData): void {
    const chart = data.chart;

    this.showingData = data;
    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.showingData.handleData(this.getData().getSteps())));
    this.showingData.chart.afterChartDisplayed(this.showingChart);
  }

  updateSortType(sortType: SortType): void {
    this.fileService.sortType = sortType;
    this.fileService.runCache = BestRun.sortRuns(FileService.racerData.allRuns, sortType);
  }

  updateGeneralSort(): void {
    this.updateSortType(new GeneralSort());
  }

  updateRewardSort(): void {
    this.updateSortType(new RewardSort());
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }
}
