import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommnetPage } from './commnet.page';

const routes: Routes = [
  {
    path: '',
    component: CommnetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommnetPageRoutingModule {}
