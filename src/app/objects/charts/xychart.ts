import {ScatterChart} from './scatter-chart';
import {ChartColor, ChartConfiguration} from 'chart.js';
import {Step} from '../step';
import {Coords} from '../coords';


export class XYChart extends ScatterChart {
  private static maxXTicks: number;
  private static maxYTicks: number;

  private speedMaps: Map<number, Coords[]>;


  constructor() {
    super('XY');
  }

  afterChartDisplayed(chart: Chart): void {
    chart.aspectRatio = XYChart.maxXTicks / XYChart.maxYTicks;
  }

  getChart(steps: Step[]): ChartConfiguration {
    this.speedMaps = new Map();

    steps.forEach(step => {
      const coords = new Coords(step.X, step.Y);
      this.getCoordsArray(step.throttle).push(coords);
    });

    return {
      type: this.chartType,
      data: {
        datasets: this.getSets()
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                stepSize: 0.5,
                callback(value: number | string, index: number, values: number[]): string | number | null | undefined {
                  XYChart.maxXTicks = values[values.length - 1];
                  return value;
                }
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                stepSize: 0.5,
                callback(value: number | string, index: number, values: number[]): string | number | null | undefined {
                  XYChart.maxYTicks = values[0];
                  return value;
                }
              }
            }
          ]
        }
      }
    };
  }

  private getCoordsArray(key: number): Coords[] {
    let arr = this.speedMaps.get(key);
    if (!arr) {
      arr = [];
      this.speedMaps.set(key, arr);
    }
    return arr;
  }

  protected getSets(): Chart.ChartDataSets[] {
    const sets: Chart.ChartDataSets[] = [];

    this.speedMaps.forEach((value, key) => {
      sets.push(this.getCoordsDataSet(key));
    });

    return sets;
  }

  protected getCoordsDataSet(key: number): Chart.ChartDataSets {
    const data = this.speedMaps.get(key);
    const sets = super.getDataSets(data);
    const color: ChartColor = this.getColorBySpeed(key);

    sets.pointRadius = 2;
    sets.pointStyle = 'circle';
    sets.pointBackgroundColor = color;
    sets.borderColor = color;
    sets.label = parseFloat(key.toString()).toFixed(1) + ' [' + data.length + ']';

    return sets;
  }

  private getColorBySpeed(key: number): ChartColor {
    key = Math.floor(key);

    switch (key) {
      case 0:
        return 'rgb(0,242,255)';
      case 1:
        return 'rgb(0,255,153)';
      case 2:
        return 'rgb(255,225,0)';
      case 3:
        return 'rgb(255,136,0)';
      case 4:
        return 'rgb(255,0,0)';
    }
  }
}
