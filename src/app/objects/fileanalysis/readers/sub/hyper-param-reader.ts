import {LogReader} from './reader';
import {HyperParameters} from '../../../hyper-parameters';
import {UnZippedFile} from '../../../../utils/un-zipped-file';

export class LogHyperParamReader extends LogReader<HyperParameters> {

    read(files: UnZippedFile[]): HyperParameters {
        const search = 'Using the following hyper\\-parameters\\n\\{[\\s\\S]*\\"term_cond_max_episodes\\"\\: .{0,}\\n\\}';
        const matchArray = this.getLogFiles(files)[0].readAsString().match(search);
        const hyperParamsString = matchArray[0].replace('Using the following hyper-parameters', '');

        const hyperParams: HyperParameters = JSON.parse(hyperParamsString);

        return hyperParams;
    }

}
