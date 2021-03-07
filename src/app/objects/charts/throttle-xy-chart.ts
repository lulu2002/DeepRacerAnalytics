import {DataBasedXyChart} from './dataBasedXyChart';
import {Step} from '../step';

export class ThrottleXyChart extends DataBasedXyChart {

  constructor() {
    super('XY', null, 1.0);
  }

  protected getStepValue(step: Step): number {
    const value = parseFloat(parseFloat((step.reward + '')).toFixed(1));

    if (value > this.maxKeyValue) {
      this.maxKeyValue = value;
    }

    if (this.minKeyValue == null || value < this.minKeyValue) {
      this.minKeyValue = value;
    }

    return value;
  }

  protected getColor(key: number): Chart.ChartColor {
    return super.getColor(key);
  }
}
