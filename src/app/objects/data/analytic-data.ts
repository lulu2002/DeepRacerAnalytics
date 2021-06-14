import {Chart} from '../charts/chart';
import {Step} from '../step';
import {Run} from '../run';

export class AnalyticData {
    public label: string;
    public displayName: string;
    public chart: Chart;

    constructor(label: string, displayName: string, chart: Chart) {
        this.label = label;
        this.displayName = displayName;
        this.chart = chart;
    }

    public handleData(runs: Run[]): Step[] {
        const steps: Step[] = [];
        runs.forEach(value => steps.push(...value.steps));
        return steps;
    }

    protected setChart(chart: Chart): void {
        this.chart = chart;
    }

    protected getChart(): Chart {
        return this.chart;
    }
}
