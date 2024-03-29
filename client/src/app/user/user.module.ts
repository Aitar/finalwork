import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPageRoutingModule} from './user-routing.module';

import {UserPage} from './user.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {PsgCardComponent} from './psg-card/psg-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPageRoutingModule,
        NgZorroAntdMobileModule,
    ],
    declarations: [UserPage, PsgCardComponent]
})
export class UserPageModule {
}
