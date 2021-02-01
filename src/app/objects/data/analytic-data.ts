import {Chart} from '../charts/chart';

export class AnalyticData {
  public label: string;
  public displayName: string;
  public chart: Chart;

  constructor(label: string, displayName: string, chart: Chart) {
    this.label = label;
    this.displayName = displayName;
    this.chart = chart;
  }

  public handleData(json: string[]): string[] {
    return json;
  }
}
