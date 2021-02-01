import {Component, Injectable} from '@angular/core';
import {FileService} from '../../service/file.service';
import * as ChartJsChart from 'chart.js';
import {ChartService} from '../../service/chart.service';
import {Chart} from '../../charts/chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  private showingChart: ChartJsChart;

  constructor(private fileService: FileService,
              public chartService: ChartService) {
  }

  public getData(): string[] {
    return this.fileService.getJson();
  }

  public updateChart(chart: Chart): void {
    this.destroyToPreventJumpingChart();

    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.getData()));
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
      console.log('destroyed');
    }
  }
}
