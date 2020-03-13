import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsgsPage } from './psgs.page';

const routes: Routes = [
  {
    path: '',
    component: PsgsPage
  },
  {
    path: 'psg-detail',
    loadChildren: () => import('./psg-detail/psg-detail.module').then( m => m.PsgDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsgsPageRoutingModule {}
