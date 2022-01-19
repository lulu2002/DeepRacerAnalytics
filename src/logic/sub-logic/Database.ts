import AnalysisResult from '../data-objects/AnalysisResult';
import Defaults from '../data-objects/Defaults';
import Episode from '../data-objects/Episode';
import Track from '../data-objects/Track';

class Database {

    private history: AnalysisResult[] = [];
    private current: AnalysisResult = Defaults.DEFAULT_RESULT;
    private trackCache: Track[] = [];

    currentEpisode: Episode = Defaults.DEFAULT_EPISODE;

    pushResult(result: AnalysisResult): void {
        this.history.push(result);
    }

    setCurrent(result: AnalysisResult): void {
        this.current = result;
        this.currentEpisode = result.episodes[0];
    }

    uploadTrack(track: Track): void {
        this.trackCache.push(track);
    }

    getTrack(name: string): Track {
        return this.trackCache.find(value => value.name === name);
    }

    getCurrent(): AnalysisResult {
        return this.current;
    }
}

export default Database;
