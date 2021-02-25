import {Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from './service/file.service';
import {ChartComponent} from './component/chart/chart.component';
import {DataService} from './service/data.service';
import {LogService} from './service/log.service';
import {FileUtils} from './utils/file-utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'DeepRacerAnalytics';

  @ViewChild('chartComponent') private cC: ChartComponent;

  constructor(private fileService: FileService,
              private dataService: DataService,
              private logService: LogService) {
  }

  ngOnInit(): void {

    this.logService.log(
      '日誌紀錄區',
      '這裡會將你的一些動作記錄下來 (例如上傳文件、載入...等)',
      '方便你查詢相關資料！',
      ' '
    );
  }

  public onFileChange(e: Event): void {
    const uploader: HTMLInputElement = e.target as HTMLInputElement;
    const file = this.getFile(uploader);

    const name = file.name;

    this.logService.log(`文件已上傳！檔名: ${name}`);
    this.logService.log('文件載入中...');

    this.checkFileSize(file);


    const promise = this.fileService.analysisFile(file);

    promise.then(() => {
      this.cC.updateChart(this.dataService.getData('xy'));
      this.logService.log('文件載入完成！', '');
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
