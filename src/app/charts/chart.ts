import {ChartConfiguration, ChartDataSets, ChartOptions, ChartType} from 'chart.js';

export abstract class Chart {
  public label: string;
  public chartType: ChartType;

  constructor(label: string, chartType: Chart.ChartType) {
    this.label = label;
    this.chartType = chartType;
  }

  public abstract getChart(json: string[]): ChartConfiguration;

  protected getDataSets(setsData: any[]): ChartDataSets {
    return {
      label: this.label,
      data: setsData,
      fill: false,
      borderWidth: 0.8,
      borderColor: ' rgb(255, 145, 65)'
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
