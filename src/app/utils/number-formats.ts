export class NumberFormats {

    public static toDigs(num: number, digs: number): number {
        return parseFloat(parseFloat(num + '').toFixed(digs));
    }

}
