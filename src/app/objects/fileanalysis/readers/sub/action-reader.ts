import {LogReader} from './reader';
import {ActionSpace} from '../../../action-space';
import {UnZippedFile} from '../../../../utils/un-zipped-file';

export class LogActionReader extends LogReader<ActionSpace[]> {

    read(files: UnZippedFile[]): ActionSpace[] {
        try {
            const matchArray = this.getAllLogsAsString(files)
                .match('Action space from file\\: \\[.{0,}\\]');

            const text = matchArray[0].replace('Action space from file: ', '')
                .replace(/\'/gi, '\"');

            return JSON.parse(text);
        } catch (e) {
            const action = {
                speed: -1,
                steering_angle: -1,
                index: 0
            };

            const array: ActionSpace[] = [];

            array.push(action as ActionSpace);

            return array;
        }
    }

}
