import {Injectable} from '@angular/core';
import * as NpyJs from 'npyjs/index.js';
import {HttpClient} from '@angular/common/http';
import {fileAnalyseObserver} from '../objects/observer/observers';
import {Track} from '../objects/tracks/track';
import {EmptyTrack} from '../objects/tracks/empty-track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private track: Track = new EmptyTrack();
  private npyJs = new NpyJs();

  constructor(private http: HttpClient) {

    fileAnalyseObserver.subscribe(value => {
      this.track = this.loadTrackByName(value.track);
    });

  }

  private loadTrackByName(track: string): Track {
    this.npyJs.load('assets/tracks/China_track.npy').then(array => {
      const trackData: number[] = array.data;

      const insideBorders: number[] = [];
      const outsideBorder: number[] = [];
      const route: number[] = [];

      let index = 0;

      while (true) {
        for (let i = 0; i < 2; i++) {
          insideBorders.push(trackData[i + index]);
        }
        index += 2;
        for (let i = 0; i < 2; i++) {
          outsideBorder.push(trackData[i + index]);
        }
        index += 2;
        for (let i = 0; i < 2; i++) {
          route.push(trackData[i + index]);
        }
        index += 2;

        if (index >= trackData.length) {
          break;
        }
      }

      return
    });
  }
}
