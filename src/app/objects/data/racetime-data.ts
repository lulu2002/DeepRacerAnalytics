import {AnalyticData} from './analytic-data';
import {Chart} from '../charts/chart';
import {fileAnalyseObserver} from '../observer/observers';

export class RacetimeData extends AnalyticData {
    constructor(label: string, displayName: string) {
        super(label, displayName, new RacetimeChart('rancetime'));
    }
}

class RacetimeChart extends Chart {

    private racerData: AnalysisResult = new EmptyAnalysisResult();

    constructor(label: string) {
        super(label, 'line');

        fileAnalyseObserver.subscribe(value => {
            this.racerData = value;
        });
    }

    // todo 只分析 metric 就好
    getChart(steps: Step[], racerData: AnalysisResult): Chart.ChartConfiguration {
        const allEpisodes = this.racerData.metrics;
        let allMetrics: Metric[] = [];

        allEpisodes.forEach(value => {

            const metric = Object.assign({}, value[0]);
            metric.elapsed_time_in_milliseconds = 0;

            value.forEach(value1 => {
                metric.elapsed_time_in_milliseconds += +value1.elapsed_time_in_milliseconds;
            });

            metric.elapsed_time_in_milliseconds /= +value.length;

            allMetrics.push(metric);
        });

        allMetrics = allMetrics.filter(value => value.phase === 'evaluation' && value.completion_percentage >= 100);


        const y = this.mapY(allMetrics);
        const x = this.mapX(allMetrics);

        return {
            type: this.chartType,
            data: {
                labels: x,
                datasets: [this.getDataSets(y)],
            },
            options: this.getChartOptions()
        };
    }

    private mapX(runs: Metric[]): number[] {
        return runs
            .map((value, index) => value.episode);
    }

    private mapY(runs: Metric[]): number[] {
        return runs
            .map(value => value.elapsed_time_in_milliseconds);
    }
}
