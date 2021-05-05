import {Injectable} from '@angular/core';
import {AnalyticData} from '../objects/data/analytic-data';
import {LineData} from '../objects/data/line-data';
import {YawData} from '../objects/data/yaw-data';
import {RewardChart} from '../objects/charts/reward-chart';
import {ThrottleXyChart} from '../objects/charts/throttle-xy-chart';
import {RacetimeData} from '../objects/data/racetime-data';
import {AnalysisService} from './analysis.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private allData: AnalyticData[] = [];


  constructor(private fileService: AnalysisService) {
    this.addData(new AnalyticData('xy', 'XY 分析圖', new ThrottleXyChart()));
    this.addData(new YawData('yaw', 'yaw'));
    this.addData(new LineData('steer', 'steer'));
    this.addData(new AnalyticData('reward', 'reward', new RewardChart()));
    this.addData(new RacetimeData('racetime', '單圈完成時間', fileService));
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
