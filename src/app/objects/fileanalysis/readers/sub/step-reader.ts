import {LogReader, Reader} from './reader';
import {Step} from '../../../step';
import {UnZippedFile} from '../../../../utils/un-zipped-file';
import {Converters} from '../../../../utils/converters';

export class CsvStepReader extends Reader<Step[]> {

    read(files: UnZippedFile[]): Step[] {
        const allCsvFiles = this.getAllCsvFiles(files);
        const steps: Step[] = this.mergeCsvFiles(allCsvFiles)
            .filter(value => value.episode >= 0 && value.steps !== undefined);

        return steps;
    }

    private getAllCsvFiles(files: UnZippedFile[]): UnZippedFile[] {
        return files.filter(value => {
            const name: string = value.name;
            return name.endsWith('.csv');
        });
    }

    private mergeCsvFiles(allCsvFiles: UnZippedFile[]): Step[] {

        const steps: Step[] = [];

        allCsvFiles.forEach(value => {
            const csv = value.readAsString();
            Converters.convertCsvToSteps(csv).forEach(step => steps.push(step));
        });

        return steps;
    }
}

export class LogStepReader extends LogReader<Step[]> {

    read(files: UnZippedFile[]): Step[] {
        const logs = this.getAllLogsAsString(files);
        const matches = this.match(logs, 'SIM_TRACE_LOG\\:.{0,}')
            .map(value => value.replace('SIM_TRACE_LOG\\:', ''))
            .reduce((a, b) => a = a.concat(`\n${b}`));

        return Converters.convertCsvToSteps(matches);
    }

}
