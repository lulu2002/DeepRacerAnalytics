import * as ChartJsChart from 'chart.js';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Step} from '../step';
import {RacerData} from '../fileanalysis/racer-data';

export abstract class Chart {
    public label: string;
    public chartType: ChartType;

    constructor(label: string, chartType: Chart.ChartType) {
        this.label = label;
        this.chartType = chartType;
    }

    public abstract getChart(steps: Step[], racerData: RacerData): Chart.ChartConfiguration;


    public afterChartDisplayed(chart: ChartJsChart): void {

    }

    protected getDataSets(setsData: any[]): ChartDataSets {
        return {
            label: this.label,
            data: setsData,
            fill: false,
            borderWidth: 0.8,
            borderColor: 'rgb(255, 145, 65)'
        };
    }

    protected getChartOptions(): ChartOptions {
        return {
            elements: {
                point: {radius: 0}
            }
        };
    }
}
