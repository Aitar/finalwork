import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PsgsPageRoutingModule} from './psgs-routing.module';

import {PsgsPage} from './psgs.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {PsgBlockComponent} from './psg-block/psg-block.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PsgsPageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [PsgsPage, PsgBlockComponent]
})
export class PsgsPageModule {
}
