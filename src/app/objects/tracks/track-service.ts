import {Track} from './track';
import {Coords} from '../coords';
import * as NpyJs from 'npyjs/index.js';

export class TrackService {

    public static isTrackSupported(track: string): boolean {
        return fetch(`assets/tracks/${track}.npy`) != null;
    }

    public static loadTrackByName(track: string): Promise<Track> {
        return new NpyJs().load(`assets/tracks/${track}.npy`).then(array => {
            const trackData: number[] = array.data;

            const insideBorders: Coords[] = [];
            const outsideBorder: Coords[] = [];
            const route: Coords[] = [];

            let index = 0;

            while (true) {
                const routeX = trackData[index];
                const routeY = trackData[1 + index];
                route.push(new Coords(routeX, routeY));
                index += 2;
                const insideBorderX = trackData[index];
                const insideBorderY = trackData[1 + index];
                insideBorders.push(new Coords(insideBorderX, insideBorderY));
                index += 2;
                const outsideBorderX = trackData[index];
                const outsideBorderY = trackData[1 + index];
                outsideBorder.push(new Coords(outsideBorderX, outsideBorderY));
                index += 2;

                if (index >= trackData.length) {
                    break;
                }
            }

            return new Track(
                track,
                insideBorders,
                outsideBorder,
                route
            );
        });
    }
}
