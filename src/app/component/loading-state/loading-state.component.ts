import {Component, OnInit} from '@angular/core';
import {analyseStateObserver} from '../../objects/observer/observers';
import {AnalysisState, defaultAnalysisState} from '../../objects/fileanalysis/analysis-state';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.scss']
})
export class LoadingStateComponent implements OnInit {

  analysisState: AnalysisState = defaultAnalysisState;

  constructor() {
    analyseStateObserver.subscribe(value => {
      this.analysisState = value;
    });
  }

  ngOnInit(): void {
  }

  isLoading(): boolean {
    return this.analysisState !== AnalysisState.WAITING && this.analysisState !== AnalysisState.DONE;
  }

  getStateName(): string {
    return AnalysisState[this.analysisState];
  }

}
