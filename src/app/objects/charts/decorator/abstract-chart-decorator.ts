import {Chart} from '../chart';
import {Step} from '../../step';
import {ChartConfiguration} from 'chart.js';
import {RacerData} from '../../fileanalysis/racer-data';

export class AbstractChartDecorator extends Chart {

  private chart: Chart;

  constructor(chart: Chart) {
    super(chart.label, chart.chartType);
    this.chart = chart;
  }

  getChart(steps: Step[], racerData: RacerData): Chart.ChartConfiguration {
    return this.chart.getChart(steps, racerData);
  }
}
