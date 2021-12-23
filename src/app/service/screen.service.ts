import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    public currentScreen: Screen = 'ANALYTICS';

    constructor() {
    }
}

export type Screen = 'MODEL_INFO' | 'ANALYTICS' | 'ABOUT';
