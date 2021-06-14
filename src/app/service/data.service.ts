import {Injectable} from '@angular/core';
import {AnalyticData} from '../objects/data/analytic-data';
import {YawData} from '../objects/data/yaw-data';
import {RewardChart} from '../objects/charts/reward-chart';
import {ThrottleXyChart} from '../objects/charts/throttle-xy-chart';
import {RacetimeData} from '../objects/data/racetime-data';
import {SteerChart} from '../objects/charts/steer-chart';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private allData: AnalyticData[] = [];


    constructor() {
        this.addData(
            new AnalyticData('xy', '速度分析圖', new ThrottleXyChart()),
            new YawData('yaw', 'yaw'),
            new AnalyticData('steer', 'steer', new SteerChart()),
            new AnalyticData('reward', 'reward', new RewardChart()),
            new RacetimeData('racetime', '單圈完成時間'))
        // new AnalyticData('train', '完成率圖', new RewardTrainingChart()))
        ;
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

    private addData(...data: AnalyticData[]): void {
        this.allData.push(...data);
    }

}
