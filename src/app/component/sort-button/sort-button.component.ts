import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {ColorButtonComponent} from '../color-button/color-button.component';
import {SortType} from '../../objects/sorts/sort-type';
import {ChartDisplayService} from '../../service/chart-display.service';

@Component({
    selector: 'app-sort-button',
    templateUrl: '../color-button/color-button.component.html',
    styleUrls: ['../color-button/color-button.component.scss']
})
export class SortButtonComponent extends ColorButtonComponent implements OnInit, AfterContentChecked {

    @Input() sortType: SortType;

    constructor(private displayService: ChartDisplayService) {
        super();
    }

    ngAfterContentChecked(): void {
        this.current = this.displayService.sortType === this.sortType;
    }

    ngOnInit(): void {
        this.shouldChangeColor = false;
    }

    changeSort(): void {
        this.displayService.changeSortType(this.sortType);
    }

    onClick($event: MouseEvent): void {
        this.changeSort();
    }
}
