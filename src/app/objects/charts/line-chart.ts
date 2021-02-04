import {Chart} from './chart';
import {ChartConfiguration} from 'chart.js';
import {Step} from '../step';

export class LineChart extends Chart {

  constructor(label: string) {
    super(label, 'line');
  }

  getChart(steps: Step[]): ChartConfiguration {
    let count = 1;
    const y = steps.map(e => e[this.label]);
    const x = y.map(e => count++);

    return {
      type: this.chartType,
      data: {
        labels: x,
        datasets: [this.getDataSets(y)],
      },
      options: this.getChartOptions()
    };
  }
}
