import {Reader} from './reader';
import {Step} from '../../step';
import {UnZippedFile} from '../../../utils/un-zipped-file';

export class CsvStepReader extends Reader<Step[]> {

    read(files: UnZippedFile[]): Step[] {
        return [];
    }

}
