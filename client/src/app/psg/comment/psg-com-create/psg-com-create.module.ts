import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PsgComCreatePageRoutingModule} from './psg-com-create-routing.module';

import {PsgComCreatePage} from './psg-com-create.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PsgComCreatePageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [PsgComCreatePage]
})
export class PsgComCreatePageModule {
}
