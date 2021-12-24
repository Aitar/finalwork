import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AvatarPageRoutingModule} from './avatar-routing.module';

import {AvatarPage} from './avatar.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarPageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [AvatarPage]
})
export class AvatarPageModule {
}
