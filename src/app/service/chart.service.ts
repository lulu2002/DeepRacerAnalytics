import {Injectable} from '@angular/core';
import {FileService} from './file.service';
import {LineChart} from '../charts/line-chart';
import {Chart} from '../charts/chart';
import {XYChart} from '../charts/xychart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private displayOptions: Chart[] = [];

  constructor(private fileService: FileService) {
    this.addChart(new XYChart());

    this.addLineCharts([
      'steps',
      'yaw',
      'steer',
      'action',
      'reward',
      'progress',
    ]);

  }

  public getCharts(): Chart[] {
    return this.displayOptions;
  }

  public getChart(label: string): Chart {
    const charts = this.displayOptions.filter(value => value.label === label);
    if (charts.length <= 0) {
      return null;
    }
    return charts[0];
  }

  private addLineCharts(labels: string[]): void {
    labels.forEach(value => this.addChart(new LineChart(value)));
  }

  private addChart(chart: Chart): void {
    this.displayOptions.push(chart);
  }

}
