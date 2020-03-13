import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPage } from './comment.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPage
  },
  {
    path: 'flw-com-page/:cId',
    loadChildren: () => import('./flw-com-page/flw-com-page.module').then( m => m.FlwComPagePageModule)
  },
  {
    path: 'comment-create/:cId',
    loadChildren: () => import('./comment-create/comment-create.module').then( m => m.CommentCreatePageModule)
  },
  {
    path: 'psg-com-create/:psgId',
    loadChildren: () => import('./psg-com-create/psg-com-create.module').then( m => m.PsgComCreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPageRoutingModule {}
