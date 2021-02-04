import {ScatterChart} from './scatter-chart';
import {ChartConfiguration} from 'chart.js';
import {Step} from '../step';


export class XYChart extends ScatterChart {

  constructor() {
    super('XY');
  }

  getChart(steps: Step[]): ChartConfiguration {
    const xy = steps.map(e => ({x: e.X, y: e.Y}));

    return {
      type: this.chartType,
      data: {
        datasets: [
          this.getDataSets(xy)
        ]
      }
    };
  }

  protected getDataSets(setsData: any[]): Chart.ChartDataSets {
    const sets = super.getDataSets(setsData);
    sets.pointRadius = 2;
    sets.pointStyle = 'circle';
    sets.pointBackgroundColor = sets.borderColor;
    return sets;
  }
}
