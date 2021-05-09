import {Component, Injectable, OnInit} from '@angular/core';
import * as ChartJsChart from 'chart.js';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';
import {SortTypes} from '../../objects/sorts/sorts';
import {ChartDisplayService} from '../../service/chart-display.service';
import {DataService} from '../../service/data.service';
import {Filters} from '../../objects/filters/filters';
import {RacerData} from '../../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../../objects/fileanalysis/empty-racer-data';
import {analyseStateObserver, chartDisplayObserver} from '../../objects/observer/observers';
import {AnalysisState} from '../../objects/fileanalysis/analysis-state';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent implements OnInit {

  private racerData: RacerData = new EmptyRacerData();
  private showingChart: ChartJsChart;
  public sortTypes = SortTypes;
  showingData: AnalyticData;
  analysisState = AnalysisState.WAITING;

  constructor(public displayService: ChartDisplayService,
              private dataService: DataService) {

    chartDisplayObserver.subscribe(value => {
      this.racerData = value;
      this.updateChart(dataService.getData('xy'));
    });

    analyseStateObserver.subscribe(value => {
      this.analysisState = value;
    });
  }

  ngOnInit(): void {
    this.updateChart(this.dataService.getData('xy'));
  }

  private onStateUpdate(): void {

  }

  public getData(): Run {
    return this.displayService.showingRun;
  }

  public isAnalysisDone(): boolean {
    return this.analysisState === AnalysisState.DONE;
  }

  public isLoading(): boolean {
    return this.analysisState !== AnalysisState.WAITING && this.analysisState !== AnalysisState.DONE;
  }

  public getStateName(): string {
    return AnalysisState[this.analysisState];
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

    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.showingData.handleData(this.getData().getSteps()), this.racerData));
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
    this.displayService.toggleFilter(Filters.FROM_START);
  }

  toggleOnlyCompleteFilter(): void {
    this.displayService.toggleFilter(Filters.ONLY_COMPLETE);
  }

  containsFromStartFilter(): boolean {
    return this.displayService.filterOptions.includes(Filters.FROM_START);
  }

  containsOnlyCompleteFilter(): boolean {
    return this.displayService.filterOptions.includes(Filters.ONLY_COMPLETE);
  }

  getAllData(): AnalyticData[] {
    return this.dataService.getAllData();
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }

  isNoRunCanDisplay(): boolean {
    return this.displayService.runsCache.length === 0;
  }
}
