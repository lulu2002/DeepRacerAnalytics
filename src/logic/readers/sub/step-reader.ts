import {LogReader, Reader} from './reader';
import UnZippedFile from '../../data-objects/UnZippedFile';
import Step from '../../data-objects/Step';

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
            let csv = value.readAsString();

            csv = csv.replace(/\[[.\-0-9]*, [.\-0-9]*]/gi, '0');

            convertCsvToSteps(csv).forEach(step => steps.push(step));
        });

        return steps;
    }
}

export class LogStepReader extends LogReader<Step[]> {

    read(files: UnZippedFile[]): Step[] {
        const logs = this.getAllLogsAsString(files);
        let matches = this.match(logs, /SIM_TRACE_LOG:.*/g)
            .map(value => value.replace('SIM_TRACE_LOG:', ''))
            .reduce((a, b) => a.concat(`\n${b}`));

        matches = 'episode,steps,X,Y,yaw,steer,throttle,action,reward,done,all_wheels_on_track,progress,closest_waypoint,track_len,tstamp,episode_status,pause_duration\n'
            + matches;

        return convertCsvToSteps(matches);
    }

}

function convertCsvToSteps(csv: string): Step[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            const s = currentLine[j];
            const sNum = +s;

            if (!isNaN(sNum)) {
                obj[headers[j]] = sNum;
            } else {
                obj[headers[j]] = s;
            }
        }

        result.push(obj);
    }

    return result;
}
