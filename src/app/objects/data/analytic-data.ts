import {Chart} from '../charts/chart';
import Episode from '../../../logic/data-objects/Episode';
import Step from '../../../logic/data-objects/Step';

export class AnalyticData {
    public label: string;
    public displayName: string;
    public chart: Chart;

    constructor(label: string, displayName: string, chart: Chart) {
        this.label = label;
        this.displayName = displayName;
        this.chart = chart;
    }

    public handleData(runs: Episode[]): Step[] {
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
