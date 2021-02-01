import {LineData} from './line-data';

export class YawData extends LineData {

  private throttle = 350;

  constructor(label: string, displayName: string) {
    super(label, displayName);
  }

  handleData(json: string[]): string[] {
    const data = super.handleData(json);

    for (let i = 0; i < data.length - 1; i++) {
      if (this.isOverflow(this.getYaw(data[i]), this.getYaw(data[i + 1]))) {
        const d = data[i + 1] as any;
        d.yaw = Math.abs(d.yaw);
      }
    }

    return data;
  }

  private isOverflow(yaw: number, yaw2: number): boolean {
    return Math.abs(yaw - yaw2) >= this.throttle;
  }

  private getYaw(data: any): number {
    return Number(data.yaw);
  }
}
