import {Component, Injectable} from '@angular/core';
import {FileService} from '../../service/file.service';
import * as ChartJsChart from 'chart.js';
import {DataService} from '../../service/data.service';
import {AnalyticData} from '../../objects/data/analytic-data';
import {Step} from '../../objects/step';

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
              public chartService: DataService) {
  }

  public getData(): Step[] {
    return this.fileService.getSteps();
  }

  public updateChart(data: AnalyticData): void {
    const chart = data.chart;

    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new ChartJsChart(ctx, chart.getChart(this.getData()));
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }
}
