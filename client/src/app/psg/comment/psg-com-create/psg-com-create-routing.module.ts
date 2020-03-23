import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PsgComCreatePage} from './psg-com-create.page';

const routes: Routes = [
    {
        path: '',
        component: PsgComCreatePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PsgComCreatePageRoutingModule {
}
