import {Component, OnInit} from '@angular/core';
import {FileService} from '../../service/file.service';
import {HyperParameters} from '../../objects/hyper-parameters';

@Component({
  selector: 'app-hyperparams',
  templateUrl: './hyperparams.component.html',
  styleUrls: ['./hyperparams.component.scss']
})
export class HyperparamsComponent implements OnInit {

  constructor(public fileService: FileService) {
  }

  ngOnInit(): void {
  }

  public getParams(): HyperParameters {
    return this.fileService.getHyperParameters();
  }

  public getParamsName(): string[] {
    return Object.keys(this.getParams());
  }

  sortSpeeds(): number[] {
    const speeds = this.fileService.getActionSpaces().map(value => {
      return parseFloat(value.speed.toFixed(2));
    });

    return this.uniqueAndSort(speeds);
  }

  sortSteerAngles(): number[] {
    const speeds = this.fileService.getActionSpaces().map(value => {
      return parseFloat(value.steering_angle.toFixed(2));
    });

    return this.uniqueAndSort(speeds);
  }

  uniqueAndSort(numberArr: number[]): number[] {
    return numberArr
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort((a) => a);
  }
}
