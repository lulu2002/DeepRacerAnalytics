import {Component, OnInit} from '@angular/core';
import {analysedEvent} from '../../objects/observer/observers';
import {NumberFormats} from '../../utils/number-formats';
import AnalysisResult from '../../../logic/data-objects/AnalysisResult';
import HyperParameters from '../../../logic/data-objects/HyperParameters';

@Component({
    selector: 'app-hyperparams',
    templateUrl: './hyperparams.component.html',
    styleUrls: ['./hyperparams.component.scss']
})
export class HyperparamsComponent implements OnInit {

    private analysisResult: AnalysisResult;

    private speeds: number[] = [];
    private steerAngles: number[] = [];
    private averageCompletePercent = 0;
    private medianCompletePercent = 0;

    constructor() {
        analysedEvent.subscribe(value => {
            this.analysisResult = value;

            this.speeds = this.sortSpeeds();
            this.steerAngles = this.sortSteerAngles();
            this.averageCompletePercent = this.calcAverageCompletePercent();
            this.medianCompletePercent = this.calcMedianCompletePercent();
        });
    }

    ngOnInit(): void {

    }

    public hasResult(): boolean {
        return this.analysisResult != null;
    }

    public getParams(): HyperParameters {
        return this.analysisResult.hyperParams;
    }

    public getParamsName(): string[] {
        return Object.keys(this.getParams());
    }

    private sortSpeeds(): number[] {
        const speeds = this.analysisResult.actionSpaces.map(value => {
            return parseFloat(value.speed.toFixed(2));
        });

        return this.uniqueAndSort(speeds);
    }

    private sortSteerAngles(): number[] {
        const speeds = this.analysisResult.actionSpaces.map(value => {
            return parseFloat(value.steering_angle.toFixed(2));
        });

        return this.uniqueAndSort(speeds);
    }

    private uniqueAndSort(numberArr: number[]): number[] {
        return numberArr
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort((a) => a);
    }

    private calcAverageCompletePercent(): number {
        const numbers = this.getProgressList();
        let sum = +0.0;

        numbers.forEach(value => sum += +value);

        return NumberFormats.toDigs((sum / numbers.length), 2);
    }

    private calcMedianCompletePercent(): number {
        const numbers = this.getProgressList().sort((a, b) => a - b);

        const centerIndex = NumberFormats.toDigs(numbers.length / 2, 0);

        return NumberFormats.toDigs(numbers[centerIndex], 2);
    }

    private getProgressList(): number[] {
        return [];
    }
}
