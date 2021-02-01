import {ScatterChart} from './scatter-chart';
import {ChartConfiguration} from 'chart.js';


export class XYChart extends ScatterChart {

  constructor() {
    super('XY');
  }

  getChart(json: string[]): ChartConfiguration {
    const xy = json.map(e => {
      return {x: Number((e as any).X), y: Number((e as any).Y)};
    });

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
