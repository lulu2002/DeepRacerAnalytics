import FileManager from './sub-logic/FileManager';
import ReadingManager from './sub-logic/ReadingManager';
import Database from './sub-logic/Database';
import Analyzer from './sub-logic/Analyzer';
import {AnalysisState} from './data-objects/EnumTypes';
import AnalysisResult from './data-objects/AnalysisResult';
import TrackLoader from './sub-logic/TrackLoader';

class App {
    private fileManager = new FileManager();
    private readingManager = new ReadingManager();
    private trackLoader = new TrackLoader();
    private analyzer = new Analyzer();
    private database = new Database();
    private state: AnalysisState = 'WAITING';


    async upload(tarGzFile: File): Promise<void> {
        const result = await this.analysisChain(tarGzFile);

        await this.uploadToDatabase(result);
        await this.handleTrack(result);

        console.log(this.currentResult);

        this.state = 'DONE';
    }

    async analysisChain(tarGzFile: File): Promise<AnalysisResult> {
        this.state = 'UPLOADING';
        const files = await this.fileManager.unPackFile(tarGzFile);

        this.state = 'PARSING';
        const reader = this.readingManager.loadReader(files);

        this.state = 'ANALYSING';
        const result = this.analyzer.analyze(reader);

        return result;
    }

    async uploadToDatabase(result: AnalysisResult): Promise<void> {
        this.database.pushResult(result);
        this.database.setCurrent(result);
    }

    async handleTrack(result: AnalysisResult): Promise<void> {
        this.state = 'LOADING_TRACK';
        const track = await this.trackLoader.loadTrackByName(result.environmentInfo.WORLD_NAME);
        this.database.uploadTrack(track);
    }

    get currentResult(): AnalysisResult {
        return this.database.getCurrent();
    }

    get analysingState(): AnalysisState {
        return this.state;
    }

    get db(): Database {
        return this.database;
    }
}

export default App;
