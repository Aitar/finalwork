import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CommentPageRoutingModule} from './comment-routing.module';

import {CommentPage} from './comment.page';
import {ComBlockComponent} from './com-block/com-block.component';
import {FlwComBlockComponent} from './flw-com-block/flw-com-block.component';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommentPageRoutingModule,
        NgZorroAntdMobileModule
    ],
    declarations: [CommentPage, ComBlockComponent, FlwComBlockComponent]
})
export class CommentPageModule {
}
