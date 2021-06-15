import {Component, OnInit} from '@angular/core';
import {HyperParameters} from '../../objects/hyper-parameters';
import {fileAnalyseObserver} from '../../objects/observer/observers';
import {RacerData} from '../../objects/fileanalysis/racer-data';
import {EmptyRacerData} from '../../objects/fileanalysis/empty-racer-data';
import {NumberFormats} from '../../utils/number-formats';

@Component({
    selector: 'app-hyperparams',
    templateUrl: './hyperparams.component.html',
    styleUrls: ['./hyperparams.component.scss']
})
export class HyperparamsComponent implements OnInit {

    racerData: RacerData = new EmptyRacerData();
    private speeds: number[] = [];
    private steerAngles: number[] = [];
    private averageCompletePercent = 0;
    private medianCompletePercent = 0;

    constructor() {
        fileAnalyseObserver.subscribe(value => {
            this.racerData = value;

            this.speeds = this.sortSpeeds();
            this.steerAngles = this.sortSteerAngles();
            this.averageCompletePercent = this.calcAverageCompletePercent();
            this.medianCompletePercent = this.calcMedianCompletePercent();
        });
    }

    ngOnInit(): void {
    }

    public getParams(): HyperParameters {
        return this.racerData.hyperParams;
    }

    public getParamsName(): string[] {
        return Object.keys(this.getParams());
    }

    private sortSpeeds(): number[] {
        const speeds = this.racerData.actionSpaces.map(value => {
            return parseFloat(value.speed.toFixed(2));
        });

        return this.uniqueAndSort(speeds);
    }

    private sortSteerAngles(): number[] {
        const speeds = this.racerData.actionSpaces.map(value => {
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
        return this.racerData.allRuns
            .map(value => +value.getLastStep().progress)
            .filter(value => !isNaN(value));
    }
}
