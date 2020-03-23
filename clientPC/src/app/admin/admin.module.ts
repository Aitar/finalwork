import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserMgtComponent} from './user-mgt/user-mgt.component';
import {PsgMgtComponent} from './psg-mgt/psg-mgt.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, UserMgtComponent, PsgMgtComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class AdminModule {
}
