import {Chart} from './chart';
import {Step} from '../step';
import {RacerData} from '../fileanalysis/racer-data';

export class RewardTrainingChart extends Chart {

  constructor() {
    super('', 'line');
  }

  getChart(steps: Step[], racerData: RacerData): Chart.ChartConfiguration {
    const numbers = racerData.allRuns.map((value, index) => index);
    return {
      type: this.chartType,
      data: {
        labels: numbers,
        datasets: [],
      },
      options: this.getChartOptions()
    };
  }

}
