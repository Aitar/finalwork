import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {UserMgtComponent} from './user-mgt/user-mgt.component';
import {PsgMgtComponent} from './psg-mgt/psg-mgt.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: '', redirectTo: 'user-mgt'},
      {path: 'user-mgt', component: UserMgtComponent},
      {path: 'psg-mgt', component: PsgMgtComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
