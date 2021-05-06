import {DataBasedXyChart} from './dataBasedXyChart';
import {Step} from '../step';

export class SteerChart extends DataBasedXyChart {

  constructor() {
    super('Steer', null, 0.0);
  }

  protected getStepValue(step: Step): number {
    const value = parseFloat(parseFloat((step.steer + '')).toFixed(1));

    if (value > this.maxKeyValue) {
      this.maxKeyValue = value;
    }

    if (this.minKeyValue == null || value < this.minKeyValue) {
      this.minKeyValue = value;
    }

    console.log(this.minKeyValue + ' - ' + this.maxKeyValue);

    return value;
  }

}
