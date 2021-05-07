export class EnvironmentInfo {
  readonly track: string;
  readonly modelName: string;
  readonly carName: string;

  constructor(track: string, modelName: string = '', carName: string = '') {
    this.track = track;
    this.modelName = modelName;
    this.carName = carName;
  }
}
