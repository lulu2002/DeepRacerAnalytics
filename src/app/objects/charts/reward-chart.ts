import {DataBasedXyChart} from './dataBasedXyChart';
import {Step} from '../step';

export class RewardChart extends DataBasedXyChart {

    constructor() {
        super('Reward', null, 0.0);
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

}
