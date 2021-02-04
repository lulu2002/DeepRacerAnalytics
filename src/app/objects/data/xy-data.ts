import {AnalyticData} from './analytic-data';
import {XYChart} from '../charts/xychart';

export class XyData extends AnalyticData {

  constructor(label: string, displayName: string) {
    super(label, displayName, new XYChart());
  }

}
