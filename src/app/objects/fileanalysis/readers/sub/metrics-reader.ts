import {Reader} from './reader';
import {Metric} from '../../../metric';
import {UnZippedFile} from '../../../../utils/un-zipped-file';

export class JsonMetricsReader extends Reader<Metric[]> {

    read(files: UnZippedFile[]): Metric[] {
        const file = files.find(value => value.name.endsWith('.json'));
        return JSON.parse(file.readAsString()).metrics;
    }

}

export class EmptyMetricsReader extends Reader<Metric[]> {

    read(files: UnZippedFile[]): Metric[] {
        return [];
    }

}
