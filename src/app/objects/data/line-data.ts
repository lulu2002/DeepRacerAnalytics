import {AnalyticData} from './analytic-data';
import {WaypointBasedLineChart} from '../charts/waypoint-based-line-chart';

export class LineData extends AnalyticData {

    constructor(label: string, displayName: string) {
        super(label, displayName, new WaypointBasedLineChart(label));
    }
}
