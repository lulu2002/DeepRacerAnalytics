import {Reader} from './sub/reader';
import Step from '../data-objects/Step';
import ActionSpace from '../data-objects/ActionSpace';
import UnZippedFile from '../data-objects/UnZippedFile';
import HyperParameters from '../data-objects/HyperParameters';
import Metric from '../data-objects/Metric';
import EnvironmentInfo from '../data-objects/EnvironmentInfo';


abstract class AnalyticReader {

    private files: UnZippedFile[];

    private actionReader: Reader<ActionSpace[]>;
    private stepReader: Reader<Step[]>;
    private hyperParamReader: Reader<HyperParameters>;
    private metricsReader: Reader<Metric[]>;
    private environmentReader: Reader<EnvironmentInfo>;

    constructor(files: UnZippedFile[],
                actionReader: Reader<ActionSpace[]>,
                stepReader: Reader<Step[]>,
                hyperParamReader: Reader<HyperParameters>,
                metricsReader: Reader<Metric[]>,
                environmentReader: Reader<EnvironmentInfo>) {
        this.files = files;
        this.actionReader = actionReader;
        this.stepReader = stepReader;
        this.hyperParamReader = hyperParamReader;
        this.metricsReader = metricsReader;
        this.environmentReader = environmentReader;
    }


    public readSteps(): Step[] {
        return this.stepReader.read(this.files);
    }

    public readHyperParams(): HyperParameters {
        return this.hyperParamReader.read(this.files);
    }

    public readActionSpaces(): ActionSpace[] {
        return this.actionReader.read(this.files);
    }

    public readEnvironment(): EnvironmentInfo {
        return this.environmentReader.read(this.files);
    }

    public readMetrics(): Metric[] {
        return this.metricsReader.read(this.files);
    }

}

export default AnalyticReader;
