import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPagPageRoutingModule } from './comment-pag-routing.module';

import { CommentPagPage } from './comment-pag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPagPageRoutingModule
  ],
  declarations: [CommentPagPage]
})
export class CommentPagPageModule {}
