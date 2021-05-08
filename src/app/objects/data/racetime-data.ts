import {AnalyticData} from './analytic-data';
import {Step} from '../step';
import {AnalysisService} from '../../service/analysis.service';
import {Chart} from '../charts/chart';
import {ChartConfiguration} from 'chart.js';
import {Run} from '../run';
import {fileAnalyseObserver} from '../observer/observers';
import {EmptyRacerData} from '../fileanalysis/empty-racer-data';
import {RacerData} from '../fileanalysis/racer-data';

export class RacetimeData extends AnalyticData {
  constructor(label: string, displayName: string, private fileService: AnalysisService) {
    super(label, displayName, new RacetimeChart('rancetime', fileService));
  }

  handleData(steps: Step[]): Step[] {
    return steps;
  }
}

class RacetimeChart extends Chart {

  private racerData: RacerData = new EmptyRacerData();

  constructor(label: string, private fileService: AnalysisService) {
    super(label, 'line');

    fileAnalyseObserver.subscribe(value => {
      this.racerData = value;
    });
  }

  getChart(steps: Step[], racerData: RacerData): Chart.ChartConfiguration {
    const allRuns = this.racerData.allRuns;

    const y = this.mapY(allRuns);
    const x = this.mapX(allRuns);

    return {
      type: this.chartType,
      data: {
        labels: x,
        datasets: [this.getDataSets(y)],
      },
      options: this.getChartOptions()
    };
  }

  private mapX(runs: Run[]): number[] {
    return runs
      .filter(value => value.isDone())
      .map((value, index) => index);
  }

  private mapY(runs: Run[]): number[] {
    return runs
      .filter(value => value.isDone())
      .map(value => value.getTimeCost());
  }
}
