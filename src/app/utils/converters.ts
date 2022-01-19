export class Converters {
    public static convertBlobToFile(blob: Blob, fileName: string): File {

        const file = blob as any;
        file.name = fileName;
        file.lastModifiedDate = new Date();

        return file as File;
    }
}
