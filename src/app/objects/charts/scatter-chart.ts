import {Chart} from './chart';

export abstract class ScatterChart extends Chart {

    constructor(label: string) {
        super(label, 'scatter');
    }
}
