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
            let csv = value.readAsString();

            csv = replaceActionArray(csv);

            Converters.convertCsvToSteps(csv).forEach(step => steps.push(step));
        });

        return steps;
    }
}

export class LogStepReader extends LogReader<Step[]> {

    read(files: UnZippedFile[]): Step[] {
        const logs = this.getAllLogsAsString(files);
        let matches = this.match(logs, /SIM_TRACE_LOG\:.*/g)
            .map(value => value.replace('SIM_TRACE_LOG\:', ''))
            .reduce((a, b) => a.concat(`\n${b}`));

        matches = replaceActionArray(matches);

        matches = 'episode,steps,X,Y,yaw,steer,throttle,action,reward,done,all_wheels_on_track,progress,closest_waypoint,track_len,tstamp,episode_status,pause_duration\n'
            + matches;

        return Converters.convertCsvToSteps(matches);
    }

}


function replaceActionArray(str: string): string {
    return str.replace(/\[[\.\-0-9]*, [\.\-0-9]*\]/gi, '0');
}
