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
        this.log(`Error! (${error.name})`);
        this.log(`Error Message: ${error.message}`);
    }
}
