import {Step} from './step';
import {Metric} from './metric';

export class Run {
    private readonly _steps: Step[];
    private metric: Metric;

    constructor(steps: Step[], metric: Metric) {
        this._steps = steps;
        this.metric = metric;
        this._reward = this.calcReward(steps);
    }

    private _reward: number;

    get reward(): number {
        return this._reward;
    }

    get isDone(): boolean {
        return this.getLastStep().progress >= 100;
    }

    get steps(): Step[] {
        return [...this._steps];
    }

    get timeCost(): number {
        return +this.getLastStep().tstamp - +this.getFirstStep().tstamp;
    }

    get episode(): number {
        return this.getFirstStep().episode;
    }

    public getMetric(): Metric {
        return this.metric;
    }

    public getLastStep(): Step {
        return this._steps[this._steps.length - 1];
    }

    public getFirstStep(): Step {
        return this._steps[0];
    }

    private calcReward(steps: Step[]): number {
        let sum = 0;
        steps.forEach(value => sum += value.reward);
        return sum;
    }
}
