import {Chart} from './chart';
import {ChartConfiguration} from 'chart.js';

export class LineChart extends Chart {

  constructor(label: string) {
    super(label, 'line');
  }

  getChart(json: string[]): ChartConfiguration {
    let count = 1;
    const y = json.map(e => Number((e as any)[this.label]));
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
