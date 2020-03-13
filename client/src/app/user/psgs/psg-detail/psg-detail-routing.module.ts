import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsgDetailPage } from './psg-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PsgDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsgDetailPageRoutingModule {}
