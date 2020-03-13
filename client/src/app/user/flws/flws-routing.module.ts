import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlwsPage } from './flws.page';

const routes: Routes = [
  {
    path: '',
    component: FlwsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlwsPageRoutingModule {}
