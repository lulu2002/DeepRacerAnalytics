import {AnalyticReader} from './analytic-reader';
import {LogActionReader} from './sub/action-reader';
import {CsvStepReader, LogStepReader} from './sub/step-reader';
import {LogHyperParamReader} from './sub/hyper-param-reader';
import {EmptyMetricsReader, JsonMetricsReader} from './sub/metrics-reader';
import {LogEnvironmentReader} from './sub/environment-reader';

export class TrainingAnalyticReader extends AnalyticReader {

    constructor() {
        super(
            new LogActionReader(),
            new CsvStepReader(),
            new LogHyperParamReader(),
            new JsonMetricsReader(),
            new LogEnvironmentReader()
        );
    }
}

export class LeaderboardAnalyticReader extends AnalyticReader {
    constructor() {
        super(
            new LogActionReader(),
            new LogStepReader(),
            new LogHyperParamReader(),
            new EmptyMetricsReader(),
            new LogEnvironmentReader()
        );
    }
}
