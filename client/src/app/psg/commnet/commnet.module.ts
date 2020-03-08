import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommnetPageRoutingModule } from './commnet-routing.module';

import { CommnetPage } from './commnet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommnetPageRoutingModule
  ],
  declarations: [CommnetPage]
})
export class CommnetPageModule {}
