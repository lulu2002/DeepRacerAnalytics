import {Chart} from '../chart';
import {Step} from '../../step';
import {AnalysisResult} from '../../fileanalysis/racer-data';

export class AbstractChartDecorator extends Chart {

    private chart: Chart;

    constructor(chart: Chart) {
        super(chart.label, chart.chartType);
        this.chart = chart;
    }

    getChart(steps: Step[], racerData: AnalysisResult): Chart.ChartConfiguration {
        return this.chart.getChart(steps, racerData);
    }
}
