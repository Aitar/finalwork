import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CommentCreatePageRoutingModule} from './comment-create-routing.module';

import {CommentCreatePage} from './comment-create.page';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommentCreatePageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [CommentCreatePage]
})
export class CommentCreatePageModule {
}
