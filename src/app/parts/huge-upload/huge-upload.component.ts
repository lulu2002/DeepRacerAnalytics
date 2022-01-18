import {Component, OnInit} from '@angular/core';
import {triggerFileUploadObserver} from '../../objects/observer/observers';

@Component({
    selector: 'app-huge-upload',
    templateUrl: './huge-upload.component.html',
    styleUrls: ['./huge-upload.component.scss']
})
export class HugeUploadComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    onClick(e: MouseEvent): void {
        triggerFileUploadObserver.next();
    }
}
