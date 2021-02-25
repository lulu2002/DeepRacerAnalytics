import {AnalyticData} from './analytic-data';
import {LineChart} from '../charts/line-chart';
import {Step} from '../step';

export class RacetimeData extends AnalyticData {


  constructor(label: string, displayName: string) {
    super(label, displayName, null);
  }


}

class RacetimeChart extends LineChart {

  protected mapX(steps: Step[]): number[] {
    return [];
  }

  protected mapY(steps: Step[]): number[] {
    return [];
  }

}
