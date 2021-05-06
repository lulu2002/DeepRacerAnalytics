import {Subject} from 'rxjs';
import {RacerData} from '../fileanalysis/racer-data';

export const fileAnalyseObserver: Subject<RacerData> = new Subject();
export const chartDisplayObserver: Subject<RacerData> = new Subject();


