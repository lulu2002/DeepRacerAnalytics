import {Component, OnInit, ViewChild} from '@angular/core';
import {AnalysisService} from './service/analysis.service';
import {ChartComponent} from './component/chart/chart.component';
import {DataService} from './service/data.service';
import {LogService} from './service/log.service';
import {FileUtils} from './utils/file-utils';
import {ExampleFilesService} from './service/example-files.service';
import {Converters} from './utils/converters';
import {analyseStateObserver, fileAnalyseObserver} from './objects/observer/observers';
import {version} from '../../package.json';
import {AnalysisState} from './objects/fileanalysis/analysis-state';
import {TrackService} from './objects/tracks/track-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
/***todo
 *   Async 分析，在分析的過程，其他 component 顯示 loading animation
 */
export class AppComponent implements OnInit {
    title = 'DeepRacerAnalytics';
    version = version;

    @ViewChild('chartComponent') private cC: ChartComponent;

    constructor(private fileService: AnalysisService,
                private dataService: DataService,
                private logService: LogService,
                public exampleFilesService: ExampleFilesService) {
    }

    ngOnInit(): void {
        this.logService.log(
            '2.5.0 - 賽道支援更新，目前已支援所有賽道',
            ' '
        );
    }

    public onFileChange(e: Event): void {
        const uploader: HTMLInputElement = e.target as HTMLInputElement;
        const file = this.getFile(uploader);
        this.onFileUploaded(file);
    }

    public uploadExampleFile(fileName: string): void {
        this.exampleFilesService.getExampleFile(fileName).subscribe(blob => {
            const file = Converters.convertBlobToFile(blob, fileName);
            this.onFileUploaded(file);
        });
    }

    public onFileUploaded(file: File): void {
        const name = file.name;

        this.logService.log(`文件已上傳！檔名: ${name}`);
        this.logService.log('文件載入中...');

        this.checkFileSize(file);

        analyseStateObserver.next(AnalysisState.FILE_UPLOADED);
        const promise = this.fileService.analysisFile(file);

        promise.then((racerData) => {
            this.logService.log('載入賽道圖片中...');
            TrackService.loadTrackByName(racerData.trackName).then(track => {
                racerData.track = track;
                this.logService.log('更新面板中...');
                analyseStateObserver.next(AnalysisState.UPDATING_PANEL);
                fileAnalyseObserver.next(racerData);
                analyseStateObserver.next(AnalysisState.DONE);
                this.logService.log('文件載入完成！', '');
            });
        });
    }

    private checkFileSize(file: File): void {
        const mBs = FileUtils.getMBs(file);
        if (mBs >= 10) {
            this.logService.log(`文件大小為: ${mBs}MB，可能會需要花費較長的時間進行分析...`);
        }
    }

    private getFile(uploader: HTMLInputElement): File {
        const files = uploader.files;
        return files[0];
    }

}
