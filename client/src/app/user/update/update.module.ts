import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UpdatePageRoutingModule} from './update-routing.module';

import {UpdatePage} from './update.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdatePageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [UpdatePage]
})
export class UpdatePageModule {
}
