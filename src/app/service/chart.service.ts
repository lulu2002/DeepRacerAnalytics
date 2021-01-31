import {Injectable} from '@angular/core';
import {FileService} from './file.service';
import {ChartConfiguration, ChartOptions} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private fileService: FileService) {
  }

  public getLineChart(value: string): ChartConfiguration {
    const json = this.fileService.getJson();

    let count = 1;
    const d = json.map(e => Number((e as any)[value]));
    const x = d.map(e => count++);
    return {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: value,
            data: d,
            fill: false,
            borderWidth: 0.8,
            borderColor: 'rgb(255,145,65)'
          }
        ]
      },
      options: this.getChartOptions()
    };
  }

  private getChartOptions(): ChartOptions {
    return {
      elements: {
        point: {
          radius: 0
        }
      }
    };
  }
}
