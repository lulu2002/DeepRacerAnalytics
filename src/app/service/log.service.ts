import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    public logs: string[] = [];

    constructor() {
    }

    public log(...log: string[]): void {
        log.forEach(text => this.logs.push(text));
    }

    public logError(error: Error): void {
        this.log(`發生錯誤！ (${error.name})`);
        this.log(`錯誤訊息: ${error.message}`);
    }
}
