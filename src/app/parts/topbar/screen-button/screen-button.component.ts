import {Component, Input, OnInit} from '@angular/core';
import {Screen, ScreenService} from '../../../service/screen.service';

@Component({
    selector: 'app-screen-button',
    templateUrl: './screen-button.component.html',
    styleUrls: ['./screen-button.component.scss']
})
export class ScreenButtonComponent implements OnInit {

    @Input()
    private screen: Screen;

    constructor(private screenService: ScreenService) {
    }

    ngOnInit(): void {
    }

    onClick(e: MouseEvent): void {
        this.screenService.currentScreen = this.screen;
    }
}
