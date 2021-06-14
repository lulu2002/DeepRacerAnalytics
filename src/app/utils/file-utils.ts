export class FileUtils {
    public static getMBs(file: File): number {
        return parseFloat((file.size / 1000 / 1000).toFixed(0));
    }
}
