import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FlwComPagePageRoutingModule} from './flw-com-page-routing.module';

import {FlwComPagePage} from './flw-com-page.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {CommentPageModule} from '../comment.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FlwComPagePageRoutingModule,
        NgZorroAntdMobileModule,
        CommentPageModule
    ],
    declarations: [FlwComPagePage]
})
export class FlwComPagePageModule {
}
