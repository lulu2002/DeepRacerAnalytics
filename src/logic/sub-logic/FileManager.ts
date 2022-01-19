import UnZippedFile from '../data-objects/UnZippedFile';
// @ts-ignore
import * as browserUntar from 'browser-untar';
// @ts-ignore
import * as pako from 'pako/index.js';

class FileManager {
    private untar = browserUntar.default.instance();

    unPackFile(tarGzFile: File): Promise<UnZippedFile[]> {
        return tarGzFile.arrayBuffer()
            .then(pako.inflate)
            .then(arr => (arr as Uint8Array).buffer)
            .then(value => this.untar.untar(value))
            .then(value => value as unknown as UnZippedFile[]);
    }
}

export default FileManager;
