import {LogReader} from './reader';
import {EnvironmentInfo} from '../../environment-info';
import {UnZippedFile} from '../../../utils/un-zipped-file';

export class LogEnvironmentReader extends LogReader<EnvironmentInfo> {

    read(files: UnZippedFile[]): EnvironmentInfo {
        const search = this.matchString(this.getAllLogsAsString(files), '\\{\\\'METRICS_S3_BUCKET\\\'.{0,}');
        const environmentInfo: EnvironmentInfo = JSON.parse(search);
        return environmentInfo;
    }

}
