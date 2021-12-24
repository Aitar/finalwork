import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CollectPageRoutingModule } from './collect-routing.module';
import { CollectPage } from './collect.page';
import {ListModule} from 'ng-zorro-antd-mobile';
import {PsgBlockComponent} from './psg-block/psg-block.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CollectPageRoutingModule,
        ListModule
    ],
    exports: [
        PsgBlockComponent
    ],
    declarations: [CollectPage, PsgBlockComponent]
})
export class CollectPageModule {}
