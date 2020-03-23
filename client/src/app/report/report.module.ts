import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReportPageRoutingModule} from './report-routing.module';

import {ReportPage} from './report.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReportPageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [ReportPage]
})
export class ReportPageModule {
}
