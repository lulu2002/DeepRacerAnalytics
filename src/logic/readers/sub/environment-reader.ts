import {LogReader} from './reader';
import EnvironmentInfo from '../../data-objects/EnvironmentInfo';
import UnZippedFile from '../../data-objects/UnZippedFile';

export class LogEnvironmentReader extends LogReader<EnvironmentInfo> {

    read(files: UnZippedFile[]): EnvironmentInfo {
        const allLogStr = this.getAllLogsAsString(files);
        const search = this.matchString(allLogStr, '\\{\\\'METRICS_S3_BUCKET\\\'.{0,}')
            .replace(/'/gi, '"');

        const environmentInfo: EnvironmentInfo = JSON.parse(search);

        return environmentInfo;
    }
}
