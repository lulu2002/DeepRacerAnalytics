import {AfterViewInit, Component, Injectable, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as ChartJsChart from 'chart.js';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Run} from '../../objects/run';
import {SortTypes} from '../../objects/sorts/sorts';
import {ChartDisplayService} from '../../service/chart-display.service';
import {DataService} from '../../service/data.service';
import {Filters} from '../../objects/filters/filters';
import {RacerData} from '../../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../../objects/fileanalysis/empty-racer-data';
import {
  analyseStateObserver,
  fileUploadedObserver,
  firstChartDisplayObserver,
  runCacheUpdateObserver
} from '../../objects/observer/observers';
import {AnalysisState} from '../../objects/fileanalysis/analysis-state';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TrackService} from '../../objects/tracks/track-service';

@Component({
    selector: 'app-chart-screen',
    templateUrl: './chart-screen.component.html',
    styleUrls: ['./chart-screen.component.scss']
})
@Injectable({
    providedIn: 'root'
})
export class ChartScreenComponent implements OnInit, AfterViewInit {

    racerData: RacerData = new EmptyRacerData();
    public sortTypes = SortTypes;
    showingData: AnalyticData;
    analysisState = AnalysisState.WAITING;
    dataSource: MatTableDataSource<Run> = new MatTableDataSource<Run>();
    fileName = '';
    @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    trackSupported = true;
    columnsToDisplay = ['episode', 'reward', 'timeCost'];
    private showingChart: ChartJsChart;

    constructor(public displayService: ChartDisplayService,
                private dataService: DataService) {

        firstChartDisplayObserver.subscribe(value => {
            this.racerData = value;
            this.trackSupported = TrackService.isTrackSupported(value.trackName);
            this.updateChart(dataService.getData('xy'));
        });

        runCacheUpdateObserver.subscribe(value => {
            this.dataSource.data = value;
        });

        analyseStateObserver.subscribe(value => {
            this.analysisState = value;
        });

        fileUploadedObserver.subscribe(value => {
            this.fileName = value.name;
        });
    }

    ngOnInit(): void {
        this.updateChart(this.dataService.getData('xy'));
    }

    ngAfterViewInit(): void {
        this.initPaginator();
        this.initSort();
    }

    public getShowingDataList(): Run[] {
        return this.displayService.showingRuns;
    }

    public isAnalysisDone(): boolean {
        return this.analysisState === AnalysisState.DONE;
    }

    public updateChart(data: AnalyticData): void {
        this.showingData = data;
        this.reRenderChart();
    }

    public onRunClick(run: Run, e: MouseEvent): void {
        if (e.shiftKey || e.ctrlKey) {
            this.toggleRun(run);
        } else {
            this.switchRun(run);
        }
        this.reRenderChart();
    }

    public selectAll(): void {
        const runs = this.displayService.runsCache;
        this.displayService.clearShowingRuns();
        this.displayService.addRuns(runs);
        this.reRenderChart();
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

    isNoRunCanDisplay(): boolean {
        return this.displayService.runsCache.length === 0;
    }

    private initPaginator(): void {
        this.paginator = this.paginators.first;

        if (this.paginators) {
            this.dataSource.paginator = this.paginator;
        }

        this.paginators.changes.subscribe((values: QueryList<MatPaginator>) => {
            this.paginator = values.first;
            this.dataSource.paginator = this.paginator;
        });
    }

    private initSort(): void {
        this.dataSource.sort = this.sort;
    }

    private toggleRun(run: Run): void {
        const showingRuns = this.displayService.showingRuns;
        const index = showingRuns.indexOf(run);

        if (index >= 0) {
            this.displayService.removeRun([run]);
        } else {
            this.displayService.addRuns([run]);
        }
    }

    private switchRun(run: Run): void {
        this.displayService.changeRun(run);
    }

    private reRenderChart(): void {
        const chart = this.showingData.chart;

        this.destroyToPreventJumpingChart();
        const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');

        this.showingChart = new ChartJsChart(ctx, chart.getChart(this.showingData.handleData(this.getShowingDataList()), this.racerData));
        this.showingData.chart.afterChartDisplayed(this.showingChart);
    }

    private destroyToPreventJumpingChart(): void {
        if (this.showingChart) {
            this.showingChart.destroy();
        }
    }

}
