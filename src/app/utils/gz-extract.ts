import * as browserUntar from 'browser-untar/dist/browser-untar.js';
import * as pako from 'pako/index.js';
import {UnZippedFile} from './un-zipped-file';

const untar = browserUntar.default.instance();

export class GzExtract {
  public static extract(tarGzFile: File): Promise<UnZippedFile[]> {
    return tarGzFile.arrayBuffer()
      .then(pako.inflate)
      .then(arr => (arr as Uint8Array).buffer)
      .then(value => untar.untar(value))
      .then(value => value as unknown as UnZippedFile[]);
  }
}
