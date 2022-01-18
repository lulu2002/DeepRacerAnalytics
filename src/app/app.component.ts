import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartScreenComponent} from './component/chart/chart-screen.component';
import {LogService} from './service/log.service';
import {Screen, ScreenService} from './service/screen.service';
import {AnalysisState, defaultAnalysisState} from './objects/fileanalysis/analysis-state';
import {analyseStateObserver} from './objects/observer/observers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
/***todo
 *   Async 分析，在分析的過程，其他 component 顯示 loading animation
 */
export class AppComponent implements OnInit {


    @ViewChild('chartComponent')
    private cC: ChartScreenComponent;
    private state = defaultAnalysisState;

    constructor(private logService: LogService,
                private screenService: ScreenService) {

        analyseStateObserver.subscribe(value => {
            this.state = value;
        });
    }

    ngOnInit(): void {
        this.logService.log(
            '2.5.1 - 修正部份賽道寬長比的問題',
            '2.5.0 - 賽道支援更新，目前已支援所有賽道',
            ' '
        );
    }

    currentScreen(): Screen {
        return this.screenService.currentScreen;
    }

    analyseFinished(): boolean {
        return this.state === AnalysisState.DONE;
    }
}
