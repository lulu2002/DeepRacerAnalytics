import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartScreenComponent} from './component/chart/chart-screen.component';
import {LogsComponent} from './component/logs/logs.component';
import {HyperparamsComponent} from './component/hyperparams/hyperparams.component';
import {HttpClientModule} from '@angular/common/http';
import {ColorButtonComponent} from './component/color-button/color-button.component';
import {SortButtonComponent} from './component/sort-button/sort-button.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {TopbarComponent} from './parts/topbar/topbar.component';
import {ScreenButtonComponent} from './parts/topbar/screen-button/screen-button.component';
import {HugeUploadComponent} from './parts/huge-upload/huge-upload.component';

@NgModule({
    declarations: [
        AppComponent,
        ChartScreenComponent,
        LogsComponent,
        HyperparamsComponent,
        ColorButtonComponent,
        SortButtonComponent,
        TopbarComponent,
        ScreenButtonComponent,
        HugeUploadComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ChartsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
