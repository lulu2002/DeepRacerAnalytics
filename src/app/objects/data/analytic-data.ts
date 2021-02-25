import {Chart} from '../charts/chart';
import {Step} from '../step';

export class AnalyticData {
  public label: string;
  public displayName: string;
  public chart: Chart;

  constructor(label: string, displayName: string, chart: Chart) {
    this.label = label;
    this.displayName = displayName;
    this.chart = chart;
  }

  public handleData(steps: Step[]): Step[] {
    return steps;
  }

  protected setChart(chart: Chart): void {
    this.chart = chart;
  }

  protected getChart(): Chart {
    return this.chart;
  }
}
