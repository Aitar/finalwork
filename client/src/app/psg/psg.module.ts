import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsgPageRoutingModule } from './psg-routing.module';

import { PsgPage } from './psg.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PsgPageRoutingModule,
        NgZorroAntdMobileModule
    ],
  declarations: [PsgPage]
})
export class PsgPageModule {}
