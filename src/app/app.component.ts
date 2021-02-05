import {Component, ElementRef, ViewChild} from '@angular/core';
import {FileService} from './service/file.service';
import {ChartComponent} from './component/chart/chart.component';
import {DataService} from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DeepRacerAnalytics';

  @ViewChild('chartComponent') private cC: ChartComponent;

  constructor(private fileService: FileService,
              private dataService: DataService) {
  }

  public onFileChange(e: Event): void {
    const uploader: HTMLInputElement = e.target as HTMLInputElement;
    const file = this.getFile(uploader);

    file.text().then(value => {
      this.fileService.updateFileContents(value);
      this.cC.updateChart(this.dataService.getData('xy'));
    });

  }

  private getFile(uploader: HTMLInputElement): File {
    const files = uploader.files;
    return files[0];
  }
}
