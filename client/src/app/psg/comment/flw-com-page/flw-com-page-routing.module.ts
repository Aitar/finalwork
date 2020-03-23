import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FlwComPagePage} from './flw-com-page.page';

const routes: Routes = [
    {
        path: '',
        component: FlwComPagePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlwComPagePageRoutingModule {
}
