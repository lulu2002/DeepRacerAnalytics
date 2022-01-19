import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Converters} from '../../utils/converters';
import {triggerFileUploadObserver} from '../../objects/observer/observers';
import {ExampleFilesService} from '../../service/example-files.service';
import {version} from '../../../../package.json';
import {AppLogicService} from '../../service/app-logic.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    @ViewChild('fileUploader') private fileUploader: ElementRef;
    version = '';

    constructor(public exampleFilesService: ExampleFilesService,
                private appLogicService: AppLogicService) {

        triggerFileUploadObserver.subscribe(() => {
            this.fileUploader.nativeElement.click();
        });
    }

    ngOnInit(): void {
        this.version = version;
    }

    public onFileChange(e: Event): void {
        const uploader: HTMLInputElement = e.target as HTMLInputElement;
        const file = this.getFile(uploader);
        this.uploadFile(file);
    }

    public uploadExampleFile(fileName: string): void {
        this.exampleFilesService.getExampleFile(fileName).subscribe(blob => {
            const file = Converters.convertBlobToFile(blob, fileName);
            this.uploadFile(file);
        });
    }

    public uploadFile(file: File): void {
        this.appLogicService.upload(file);
    }

    private getFile(uploader: HTMLInputElement): File {
        const files = uploader.files;
        return files[0];
    }
}
