import {Injectable} from '@angular/core';
import {AnalyticData} from '../objects/data/analytic-data';
import {LineData} from '../objects/data/line-data';
import {YawData} from '../objects/data/yaw-data';
import {XYChart} from '../objects/charts/xychart';
import {RewardChart} from '../objects/charts/reward-chart';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private allData: AnalyticData[] = [];

  constructor() {
    this.addData(new AnalyticData('xy', 'XY 分析圖', new XYChart()));
    this.addData(new YawData('yaw', 'yaw'));
    this.addData(new LineData('steer', 'steer'));
    this.addData(new LineData('reward', 'reward'));
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
