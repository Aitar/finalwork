import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConfigPageRoutingModule} from './config-routing.module';

import {ConfigPage} from './config.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConfigPageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [ConfigPage]
})
export class ConfigPageModule {
}
