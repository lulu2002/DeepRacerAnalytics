import {LineChart} from './line-chart';
import {Step} from '../step';

export class WaypointBasedLineChart extends LineChart {

  protected mapX(steps: Step[]): number[] {
    return steps
      .sort((a, b) => a.closest_waypoint - b.closest_waypoint)
      .map(value => value.closest_waypoint);
  }

  protected mapY(steps: Step[]): number[] {
    return steps.map(value => value[this.label]);
  }
}
