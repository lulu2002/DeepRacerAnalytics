import {Track} from './track';

export class EmptyTrack extends Track {

  constructor() {
    super('empty', [], [], []);
  }
}
