import {Subject} from 'rxjs';
import AnalysisResult from '../../../logic/data-objects/AnalysisResult';
import {AnalysisState} from '../../../logic/data-objects/EnumTypes';
import Episode from '../../../logic/data-objects/Episode';

export const fileAnalyseObserver: Subject<AnalysisResult> = new Subject();
export const firstChartDisplayObserver: Subject<AnalysisResult> = new Subject();
export const analyseStateObserver: Subject<AnalysisState> = new Subject();
export const runCacheUpdateObserver: Subject<Episode[]> = new Subject<Episode[]>();
export const fileUploadedObserver: Subject<File> = new Subject<File>();
export const triggerFileUploadObserver: Subject<void> = new Subject<void>();

export const analysedEvent: Subject<AnalysisResult> = new Subject();
