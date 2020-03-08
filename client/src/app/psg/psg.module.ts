import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsgPageRoutingModule } from './psg-routing.module';

import { PsgPage } from './psg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsgPageRoutingModule
  ],
  declarations: [PsgPage]
})
export class PsgPageModule {}
