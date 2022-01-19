import {Reader} from './reader';
import Metric from '../../data-objects/Metric';
import UnZippedFile from '../../data-objects/UnZippedFile';

export class JsonMetricsReader extends Reader<Metric[]> {

    read(files: UnZippedFile[]): Metric[] {
        const file = files.find(value => value.name.endsWith('.json'));

        if (file == null) {
            return [];
        }

        return JSON.parse(file.readAsString()).metrics;
    }

}

export class EmptyMetricsReader extends Reader<Metric[]> {

    read(files: UnZippedFile[]): Metric[] {
        return [];
    }

}
