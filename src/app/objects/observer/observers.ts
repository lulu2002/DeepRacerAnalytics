import {Subject} from 'rxjs';
import {RacerData} from '../fileanalysis/racer-data';
import {AnalysisState} from '../fileanalysis/analysis-state';

export const fileAnalyseObserver: Subject<RacerData> = new Subject();
export const chartDisplayObserver: Subject<RacerData> = new Subject();
export const analyseStateObserver: Subject<AnalysisState> = new Subject();
