import {Chart} from './chart';
import {ChartFromOneDecorator} from './decorator/chart-from-one-decorator';

export class ChartBuilder {

    private chart: Chart;

    private constructor(chart: Chart) {
        this.chart = chart;
    }

    public static from(chart: Chart): ChartBuilder {
        return new ChartBuilder(chart);
    }

    public fromZero(): ChartBuilder {
        this.chart = new ChartFromOneDecorator(this.chart);
        return this;
    }

    public build(): Chart {
        return this.chart;
    }

}
