import {Component, Injectable} from '@angular/core';
import {FileService} from '../service/file.service';
import * as Chart from 'chart.js';
import {ChartService} from '../service/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChartComponent {

  constructor(private fileService: FileService,
              private chartService: ChartService) {
  }

  public getLabels(): string[] {
    const json = this.fileService.getJson();
    if (json && json.length > 0) {
      return Object.keys(json[0]);
    }
    return [];
  }

  public updateChart(label: string): void {
    const ctx = (document.querySelector('#chart') as HTMLCanvasElement).getContext('2d');
    const chart = new Chart(ctx, this.chartService.getLineChart(label));
  }

}
