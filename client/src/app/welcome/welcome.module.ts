import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import {DiscriptionComponent} from './discription/discription.component';
import {StyleChooseComponent} from './style-choose/style-choose.component';
import {ReadyToGoComponent} from './ready-to-go/ready-to-go.component';
import {WhiteSpaceModule} from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    WhiteSpaceModule
  ],
  declarations: [
      WelcomePage,
    DiscriptionComponent,
    StyleChooseComponent,
    ReadyToGoComponent]
})
export class WelcomePageModule {}
