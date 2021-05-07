import {Coords} from '../coords';

export abstract class Track {
  private _name: string;
  private _insideBorder: Coords[];
  private _outsideBorder: Coords[];
  private _humanBestRoute: Coords[];


  constructor(name: string) {
    this._name = name;
    this._insideBorder = this.registerInsideBorders();
    this._outsideBorder = this.registerOutsideBorders();
    this._humanBestRoute = this.registerHumanBestRoute();
  }


  protected abstract registerInsideBorders(): Coords[];

  protected abstract registerOutsideBorders(): Coords[];

  protected abstract registerHumanBestRoute(): Coords[];


  get name(): string {
    return this._name;
  }

  get insideBorder(): Coords[] {
    return this._insideBorder;
  }

  get outsideBorder(): Coords[] {
    return this._outsideBorder;
  }

  get humanBestRoute(): Coords[] {
    return this._humanBestRoute;
  }
}
