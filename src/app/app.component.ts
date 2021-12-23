import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from './component/chart/chart.component';
import {LogService} from './service/log.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
/***todo
 *   Async 分析，在分析的過程，其他 component 顯示 loading animation
 */
export class AppComponent implements OnInit {


    @ViewChild('chartComponent') private cC: ChartComponent;

    constructor(private logService: LogService) {
    }

    ngOnInit(): void {
        this.logService.log(
            '2.5.1 - 修正部份賽道寬長比的問題',
            '2.5.0 - 賽道支援更新，目前已支援所有賽道',
            ' '
        );
    }

}
