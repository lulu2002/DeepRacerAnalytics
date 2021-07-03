import {Track} from './track';
import {Coords} from '../coords';

export class EmptyTrack extends Track {

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
