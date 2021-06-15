import {UnZippedFile} from '../../../../utils/un-zipped-file';

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

    protected matchString(fileStr: string, regex: string | RegExp): string {
        return this.match(fileStr, regex)[0];
    }

    protected match(fileStr: string, regex: string | RegExp): string[] {
        const matchArray = fileStr.match(regex);

        if (matchArray != null) {
            return matchArray;
        }

        return [''];
    }
}
