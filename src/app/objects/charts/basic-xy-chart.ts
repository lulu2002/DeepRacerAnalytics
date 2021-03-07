import {ScatterChart} from './scatter-chart';
import {Step} from '../step';
import {Coords} from '../coords';
import {ReInvent2018} from '../tracks/re-invent2018';

export class BasicXyChart extends ScatterChart {
  private static maxXTicks: number;
  private static maxYTicks: number;

  afterChartDisplayed(chart: Chart): void {
    chart.aspectRatio = BasicXyChart.maxXTicks / BasicXyChart.maxYTicks;
  }

  getChart(steps: Step[]): Chart.ChartConfiguration {
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
                  BasicXyChart.maxXTicks = values[values.length - 1];
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
                  BasicXyChart.maxYTicks = values[0];
                  return value;
                }
              }
            }
          ]
        }
      }
    };
  }

  protected getSets(): Chart.ChartDataSets[] {
    const sets: Chart.ChartDataSets[] = [];

    const track = new ReInvent2018();

    sets.push(this.getTrackBorderSets(track.insideBorder));
    sets.push(this.getTrackBorderSets(track.outsideBorder));

    return sets;
  }

  protected getTrackBorderSets(coords: Coords[]): Chart.ChartDataSets {
    const sets = super.getDataSets(coords);

    sets.pointRadius = 0;
    sets.showLine = true;
    sets.borderWidth = 2;
    sets.borderColor = 'rgb(142,144,144,0.25)';
    sets.pointBackgroundColor = 'rgb(142,144,144,0.25)';

    return sets;
  }

}
