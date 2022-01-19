import Episode from './Episode';
import HyperParameters from './HyperParameters';
import EnvironmentInfo from './EnvironmentInfo';
import Step from './Step';
import ActionSpace from './ActionSpace';

interface AnalysisResult {
    steps: Step[];
    episodes: Episode[];
    hyperParams: HyperParameters;
    actionSpaces: ActionSpace[];
    environmentInfo: EnvironmentInfo;
}

export default AnalysisResult;
