import {Chart} from '../chart';
import {Step} from '../../step';

export class AbstractChartDecorator extends Chart {

  private chart: Chart;

  constructor(chart: Chart) {
    super(chart.label, chart.chartType);
    this.chart = chart;
  }

  getChart(steps: Step[]): Chart.ChartConfiguration {
    return this.chart.getChart(steps);
  }
}
