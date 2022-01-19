import {ChartColor} from 'chart.js';
import {Coords} from '../coords';
import {BasicXyChart} from './basic-xy-chart';
import {Step} from '../step';
import * as d3 from 'd3';
import {NumberFormats} from '../../utils/number-formats';
import {fileAnalyseObserver} from '../observer/observers';
import {AnalysisResult} from '../fileanalysis/racer-data';


export abstract class DataBasedXyChart extends BasicXyChart {

    private static readonly maxColorValue = 0.9;
    private static readonly minColorValue = 0.3;
    protected minKeyValue: number;
    protected maxKeyValue: number;
    private map: Map<number, Coords[]>;

    constructor(label: string, minKeyValue: number, maxKeyValue: number) {
        super(label);
        this.minKeyValue = minKeyValue;
        this.maxKeyValue = maxKeyValue;

        fileAnalyseObserver.subscribe(() => {
            this.minKeyValue = minKeyValue;
            this.maxKeyValue = maxKeyValue;
        });
    }

    getChart(steps: Step[], racerData: AnalysisResult): Chart.ChartConfiguration {
        this.map = new Map();

        steps.forEach(step => {
            const coords = new Coords(step.X, step.Y);
            this.getCoordsArray(this.getStepValue(step)).push(coords);
        });

        const chart = super.getChart(steps, racerData);

        return chart;
    }

    protected abstract getStepValue(step: Step): number;

    protected getSets(): Chart.ChartDataSets[] {
        const sets = super.getSets();

        this.map.forEach((value, key) => {
            sets.push(this.getCoordsDataSet(key));
        });

        return sets;
    }

    protected getCoordsDataSet(key: number): Chart.ChartDataSets {
        const data = this.map.get(key);
        const sets = super.getDataSets(data);
        const color: ChartColor = this.getColor(key);

        sets.pointRadius = 2;
        sets.pointStyle = 'circle';
        sets.pointBackgroundColor = color;
        sets.borderColor = color;
        sets.label = NumberFormats.toDigs(key, 1) + ' [' + data.length + ']';

        return sets;
    }

    protected getColor(key: number): ChartColor {
        const t = this.toColorNum(key);
        return d3.interpolateTurbo(t);
    }

    private getCoordsArray(key: number): Coords[] {
        let arr = this.map.get(key);
        if (!arr) {
            arr = [];
            this.map.set(key, arr);
        }
        return arr;
    }

    private toColorNum(key: number): number {
        const maxRange = DataBasedXyChart.maxColorValue - DataBasedXyChart.minColorValue;
        const colorRange = this.maxKeyValue - this.minKeyValue;

        return DataBasedXyChart.minColorValue + ((maxRange * (key - this.minKeyValue)) / colorRange);
    }
}
