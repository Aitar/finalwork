import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlwComPagePageRoutingModule } from './flw-com-page-routing.module';

import { FlwComPagePage } from './flw-com-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlwComPagePageRoutingModule
  ],
  declarations: [FlwComPagePage]
})
export class FlwComPagePageModule {}
