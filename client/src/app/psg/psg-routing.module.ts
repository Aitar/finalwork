import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PsgPage} from './psg.page';

const routes: Routes = [
    {
        path: '',
        component: PsgPage
    },
    {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.CommentPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PsgPageRoutingModule {
}
