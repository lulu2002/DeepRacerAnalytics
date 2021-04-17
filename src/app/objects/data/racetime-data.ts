import {AnalyticData} from './analytic-data';
import {Step} from '../step';
import {FileService} from '../../service/file.service';
import {Chart} from '../charts/chart';
import {ChartConfiguration} from 'chart.js';
import {Run} from '../run';

export class RacetimeData extends AnalyticData {
  constructor(label: string, displayName: string, private fileService: FileService) {
    super(label, displayName, new RacetimeChart('rancetime', fileService));
  }

  handleData(steps: Step[]): Step[] {
    return steps.filter(value => FileService.getMetric(value.episode).phase === 'evaluation');
  }
}

class RacetimeChart extends Chart {

  constructor(label: string, private fileService: FileService) {
    super(label, 'line');
  }

  getChart(steps: Step[]): ChartConfiguration {
    const allRuns = this.fileService.getAllRunsNoSort();

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
