import {ScatterChart} from './scatter-chart';
import {Step} from '../step';
import {Coords} from '../coords';
import {fileAnalyseObserver} from '../observer/observers';
import {RacerData} from '../fileanalysis/racer-data';
import {EmptyRacerData} from '../fileanalysis/empty-racer-data';
import {ChartColor} from 'chart.js';

export class BasicXyChart extends ScatterChart {
    private racerData: RacerData = new EmptyRacerData();
    private aspectRatio = 0;

    constructor(label: string) {
        super(label);

        fileAnalyseObserver.subscribe(racerData => {
            this.racerData = racerData;
            this.aspectRatio = this.getAspectRatioByStepXy();
        });
    }

    getChart(steps: Step[], racerData: RacerData): Chart.ChartConfiguration {
        return {
            type: this.chartType,
            data: {
                datasets: this.getSets()
            },
            options: {
                legend: {
                    display: true
                },
                aspectRatio: this.aspectRatio,
                scales: {
                    xAxes: [
                        {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 0.5
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 0.5
                            }
                        }
                    ]
                }
            }
        };
    }

    protected getSets(): Chart.ChartDataSets[] {
        const sets: Chart.ChartDataSets[] = [];

        const track = this.racerData.track;

        sets.push(this.getStyleSets(track.insideBorder));
        sets.push(this.getStyleSets(track.outsideBorder));
        sets.push(this.getStyleSets(track.humanBestRoute, '幾何參考路徑 (點我切換顯示)', 'rgba(13,154,102,0.25)'));

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

    private getAspectRatioByStepXy(): number {
        const steps = this.racerData.steps;
        let maxX = 0;
        let minX = 0;
        let maxY = 0;
        let minY = 0;


        steps.forEach(s => {

            if (s.X > maxX) {
                maxX = s.X;
            }

            if (s.Y > maxY) {
                maxY = s.Y;
            }

            if (s.X < minX) {
                minX = s.X;
            }

            if (s.Y < minY) {
                minY = s.Y;
            }
        });

        return Math.abs(maxX - minX) / Math.abs(maxY - minY);
    }

}
