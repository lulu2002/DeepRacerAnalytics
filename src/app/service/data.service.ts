import {Injectable} from '@angular/core';
import {AnalyticData} from '../objects/data/analytic-data';
import {LineData} from '../objects/data/line-data';
import {XyData} from '../objects/data/xy-data';
import {YawData} from '../objects/data/yaw-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private allData: AnalyticData[] = [];

  constructor() {
    this.addData(new XyData('xy', 'XY 分析圖'));
    this.addData(new LineData('steps', 'steps'));
    this.addData(new YawData('yaw', 'yaw'));
    this.addData(new LineData('steer', 'steer'));
    this.addData(new LineData('action', 'action'));
    this.addData(new LineData('reward', 'reward'));
    this.addData(new LineData('progress', 'progress'));
  }

  public getAllData(): AnalyticData[] {
    return this.allData;
  }

  public getData(label: string): AnalyticData {
    const charts = this.allData.filter(value => value.label === label);
    if (charts.length <= 0) {
      return null;
    }
    return charts[0];
  }

  private addData(data: AnalyticData): void {
    this.allData.push(data);
  }

}
