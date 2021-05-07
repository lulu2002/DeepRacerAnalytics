import {ScatterChart} from './scatter-chart';
import {Step} from '../step';
import {Coords} from '../coords';
import {TrackFactory} from '../tracks/track-factory';
import {fileAnalyseObserver} from '../observer/observers';
import {RacerData} from '../fileanalysis/racer-data';
import {EmptyRacerData} from '../fileanalysis/empty-racer-data';
import {ChartColor} from 'chart.js';

export class BasicXyChart extends ScatterChart {
  private static maxXTicks: number;
  private static maxYTicks: number;

  private racerData: RacerData = new EmptyRacerData();

  constructor(label: string) {
    super(label);

    fileAnalyseObserver.subscribe(racerData => {
      this.racerData = racerData;
    });
  }

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

    const track = TrackFactory.findTrack(this.racerData.track);

    sets.push(this.getStyleSets(track.insideBorder));
    sets.push(this.getStyleSets(track.outsideBorder));
    sets.push(this.getStyleSets(track.humanBestRoute, '參考最佳路徑', 'rgba(13,154,102,0.25)'));

    return sets;
  }

  protected getStyleSets(coords: Coords[],
                         label: string = 'Border',
                         color: ChartColor = 'rgb(142,144,144,0.25)'
  ): Chart.ChartDataSets {
    const sets = super.getDataSets(coords);

    sets.label = label;
    sets.pointRadius = 0;
    sets.showLine = true;
    sets.borderWidth = 2;
    sets.borderColor = color;
    sets.pointBackgroundColor = 'rgb(142,144,144,0.25)';

    return sets;
  }

}
