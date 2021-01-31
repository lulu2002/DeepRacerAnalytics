import {Component, Injectable} from '@angular/core';
import {FileService} from '../service/file.service';
import * as Chart from 'chart.js';
import {ChartService} from '../service/chart.service';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  private showingChart: Chart;

  constructor(private fileService: FileService,
              private chartService: ChartService) {
  }

  public isDataExist(): boolean {
    return this.fileService.getJson() != null;
  }

  public getLabels(): string[] {
    const json = this.fileService.getJson();
    if (json && json.length > 0) {
      return Object.keys(json[0]);
    }
    return [];
  }

  public updateChart(label: string, chartType: ChartType): void {
    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new Chart(ctx, this.chartService.getLineChart(label));
  }

  public updateXYChart(): void {
    this.destroyToPreventJumpingChart();
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    this.showingChart = new Chart(ctx, this.chartService.getXYChart());
  }

  private destroyToPreventJumpingChart(): void {
    if (this.showingChart) {
      this.showingChart.destroy();
    }
  }

}
