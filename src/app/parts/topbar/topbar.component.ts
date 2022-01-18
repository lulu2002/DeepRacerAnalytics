import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Converters} from '../../utils/converters';
import {analyseStateObserver, fileAnalyseObserver, triggerFileUploadObserver} from '../../objects/observer/observers';
import {AnalysisState} from '../../objects/fileanalysis/analysis-state';
import {TrackService} from '../../objects/tracks/track-service';
import {FileUtils} from '../../utils/file-utils';
import {AnalysisService} from '../../service/analysis.service';
import {DataService} from '../../service/data.service';
import {LogService} from '../../service/log.service';
import {ExampleFilesService} from '../../service/example-files.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    @ViewChild('fileUploader') private fileUploader: ElementRef;

    constructor(private fileService: AnalysisService,
                private dataService: DataService,
                private logService: LogService,
                public exampleFilesService: ExampleFilesService) {

        triggerFileUploadObserver.subscribe(() => {
            this.fileUploader.nativeElement.click();
        });
    }

    ngOnInit(): void {
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
