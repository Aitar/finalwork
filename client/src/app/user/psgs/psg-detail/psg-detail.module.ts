import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PsgDetailPageRoutingModule} from './psg-detail-routing.module';

import {PsgDetailPage} from './psg-detail.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PsgDetailPageRoutingModule
    ],
    declarations: [PsgDetailPage]
})
export class PsgDetailPageModule {
}
