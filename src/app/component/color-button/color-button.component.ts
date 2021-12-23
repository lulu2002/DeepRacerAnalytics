import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-color-button',
    templateUrl: './color-button.component.html',
    styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit {

    @Input() current: boolean;
    @Input() shouldChangeColor = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    getColor(): string {
        if (this.shouldChangeColor) {

            if (this.current) {
                return '';
            } else {
                return '#8d8d8d';
            }

        } else {
            return '';
        }
    }

    onClick($event: MouseEvent): void {

    }
}
