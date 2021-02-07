import {Coords} from '../coords';

export abstract class Track {
  private name: string;
  public insideBorder: Coords[];
  public outsideBorder: Coords[];


  constructor(name: string) {
    this.name = name;
    this.insideBorder = this.registerInsideBorders();
    this.outsideBorder = this.registerOutsideBorders();
  }


  protected abstract registerInsideBorders(): Coords[];

  protected abstract registerOutsideBorders(): Coords[];
}
