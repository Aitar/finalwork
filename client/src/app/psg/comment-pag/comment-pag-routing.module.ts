import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPagPage } from './comment-pag.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPagPageRoutingModule {}
