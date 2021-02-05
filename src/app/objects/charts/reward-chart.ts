import {ScatterChart} from './scatter-chart';
import {Step} from '../step';

export class RewardChart extends ScatterChart {


  constructor(label: string) {
    super(label);
  }

  getChart(steps: Step[]): Chart.ChartConfiguration {
    return {
      type: this.chartType,
      data: {
        datasets: [
          this.getDataSets(steps.map(value => value.reward))
        ]
      }
    };
  }
}
