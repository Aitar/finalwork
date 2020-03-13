import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlwsPageRoutingModule } from './flws-routing.module';

import { FlwsPage } from './flws.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FlwsPageRoutingModule,
        NgZorroAntdMobileModule
    ],
  declarations: [FlwsPage]
})
export class FlwsPageModule {}
