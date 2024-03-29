import {Subject} from 'rxjs';
import {RacerData} from '../fileanalysis/racer-data';
import {AnalysisState} from '../fileanalysis/analysis-state';
import {Run} from '../run';

export const fileAnalyseObserver: Subject<RacerData> = new Subject();
export const firstChartDisplayObserver: Subject<RacerData> = new Subject();
export const analyseStateObserver: Subject<AnalysisState> = new Subject();
export const runCacheUpdateObserver: Subject<Run[]> = new Subject<Run[]>();
export const fileUploadedObserver: Subject<File> = new Subject<File>();
export const triggerFileUploadObserver: Subject<void> = new Subject<void>();
