import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit {

  @Input() current: boolean;
  @Input() shouldChangeColor = false;
  @Input() whenLight: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  getColor(): string {
    if (this.shouldChangeColor) {

      if (this.whenLight) {
        return '';
      } else {
        return 'darkgray';
      }

    } else {
      return '';
    }
  }

  onClick($event: MouseEvent): void {

  }
}
