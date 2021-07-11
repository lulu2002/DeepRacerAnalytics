import {Coords} from '../coords';

export class Track {
    public readonly name: string;
    public readonly insideBorder: Coords[];
    public readonly outsideBorder: Coords[];
    public readonly humanBestRoute: Coords[];


    constructor(name: string, insideBorder: Coords[], outsideBorder: Coords[], humanBestRoute: Coords[]) {
        this.name = name;
        this.insideBorder = insideBorder;
        this.outsideBorder = outsideBorder;
        this.humanBestRoute = humanBestRoute;
    }
}
