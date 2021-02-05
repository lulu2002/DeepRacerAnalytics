import {Chart} from './chart';
import {ChartConfiguration} from 'chart.js';
import {Step} from '../step';

export class LineChart extends Chart {

  constructor(label: string) {
    super(label, 'line');
  }

  getChart(steps: Step[]): ChartConfiguration {
    const y = steps.map(e => e[this.label]);
    const x = steps.map(e => e.closest_waypoint);

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
