import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPageRoutingModule } from './recent-routing.module';

import { RecentPage } from './recent.page';
import {PsgBlockComponent} from './psg-block/psg-block.component';
import {ListModule, WhiteSpaceModule} from 'ng-zorro-antd-mobile';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RecentPageRoutingModule,
        ListModule,
        WhiteSpaceModule
    ],
    exports: [
        PsgBlockComponent
    ],
    declarations: [RecentPage, PsgBlockComponent]
})
export class RecentPageModule {}
