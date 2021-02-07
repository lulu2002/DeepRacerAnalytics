import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartComponent} from './component/chart/chart.component';
import { LogsComponent } from './component/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
