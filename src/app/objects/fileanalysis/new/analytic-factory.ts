import {Step} from '../../step';
import {HyperParameters} from '../../hyper-parameters';
import {ActionSpace} from '../../action-space';
import {EnvironmentInfo} from '../../environment-info';
import {Metric} from '../../metric';
import {Reader} from './reader';
import {UnZippedFile} from '../../../utils/un-zipped-file';

abstract class AnalyticFactory {

    private files: UnZippedFile[];

    private actionReader: Reader<ActionSpace>;
    private stepReader: Reader<Step[]>;
    private hyperParamReader: Reader<HyperParameters>;
    private metricsReader: Reader<Metric[]>;
    private environmentReader: Reader<EnvironmentInfo>;

    constructor(files: UnZippedFile[]) {
        this.files = files;
    }

    public readSteps(): Step[] {
        return this.stepReader.read(this.files);
    }

    public readHyperParams(): HyperParameters {
        return this.hyperParamReader.read(this.files);
    }

    public readActionSpaces(): ActionSpace {
        return this.actionReader.read(this.files);
    }

    public readEnvironment(): EnvironmentInfo {
        return this.environmentReader.read(this.files);
    }

    public readMetrics(): Metric[] {
        return this.metricsReader.read(this.files);
    }

}
