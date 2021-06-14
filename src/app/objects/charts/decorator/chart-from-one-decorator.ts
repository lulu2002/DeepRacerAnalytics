import {AbstractChartDecorator} from './abstract-chart-decorator';

export class ChartFromOneDecorator extends AbstractChartDecorator {

    protected getChartOptions(): Chart.ChartOptions {
        const chartOptions = super.getChartOptions();
        const scales = chartOptions.scales;

        scales.ticks.min = 0;

        return chartOptions;
    }

}
