import {UnZippedFile} from '../../../utils/un-zipped-file';

export abstract class Reader<E> {
    public abstract read(files: UnZippedFile[]): E;
}

export abstract class LogReader<E> extends Reader<E> {

    protected getLogFiles(files: UnZippedFile[]): UnZippedFile[] {
        return files.filter(value => value.name.endsWith('.log'));
    }

    protected getAllLogsAsString(files: UnZippedFile[]): string {
        const logFiles = this.getLogFiles(files);
        let s = '';

        logFiles.forEach(value => {
            s = s.concat('\n', value.readAsString());
        });

        return s;
    }

    protected matchString(fileStr: string, regex: string): string {
        let name = '';

        const matchArray = fileStr.match(regex);

        if (matchArray != null) {
            name = matchArray[0];
        }

        return name;
    }
}
