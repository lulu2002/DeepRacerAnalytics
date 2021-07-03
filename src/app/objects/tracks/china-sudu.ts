import {Track} from './track';
import {Coords} from '../coords';
import * as NpyJs from 'npyjs/index.js';

export class ChinaSuduTrack extends Track {

  constructor() {
    super('China_track');
  }

  protected registerInsideBorders(): Coords[] {
    return [];
  }

  protected registerOutsideBorders(): Coords[] {
    return [];
  }

  protected registerHumanBestRoute(): Coords[] {
    return [];
  }
}
