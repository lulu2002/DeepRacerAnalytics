import {Injectable} from '@angular/core';
import {FileService} from './file.service';
import {ChartColor, ChartConfiguration, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color} from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private fileService: FileService) {
  }

  public getLineChart(value: string): ChartConfiguration {

    const json = this.fileService.getJson();

    let count = 1;
    const y = json.map(e => Number((e as any)[value]));
    const x = y.map(e => count++);

    return {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          this.getDataSets(value, y)
        ]
      },
      options: this.getChartOptions()
    };
  }

  public getXYChart(): ChartConfiguration {
    const json = this.fileService.getJson();

    const xy = json.map(e => {
      return {x: Number((e as any).X), y: Number((e as any).Y)};
    });

    return {
      type: 'scatter',
      data: {
        datasets: [
          this.getDataSets('XY', xy)
        ]
      }
    };
  }

  private getDataSets(setsLabel: any, setsData: any[]): ChartDataSets {
    return {
      label: setsLabel,
      data: setsData,
      fill: false,
      borderWidth: 0.8,
      borderColor: ' rgb(255, 145, 65)'
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
