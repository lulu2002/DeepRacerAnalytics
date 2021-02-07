import * as pako from 'pako/index.js';
import * as untar from 'js-untar';
import {UnZippedFile} from './un-zipped-file';

export class GzExtract {
  public static extract(tarGzFile: File): Promise<UnZippedFile[]> {
    return tarGzFile.arrayBuffer()
      .then(pako.inflate)
      .then(arr => (arr as Uint8Array).buffer)
      .then(untar)
      .then(value => value as unknown as UnZippedFile[]);
  }
}
