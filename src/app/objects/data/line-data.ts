import {AnalyticData} from './analytic-data';
import {LineChart} from '../charts/line-chart';

export class LineData extends AnalyticData {

  constructor(label: string, displayName: string) {
    super(label, displayName, new LineChart(label));
  }
}
