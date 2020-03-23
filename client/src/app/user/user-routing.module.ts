import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserPage} from './user.page';

const routes: Routes = [
    {
        path: '',
        component: UserPage
    },
    {
        path: 'other',
        loadChildren: () => import('./other/other.module').then(m => m.OtherPageModule)
    },
    {
        path: 'self',
        loadChildren: () => import('./self/self.module').then(m => m.SelfPageModule)
    },
    {
        path: 'fans',
        loadChildren: () => import('./fans/fans.module').then(m => m.FansPageModule)
    },
    {
        path: 'flws',
        loadChildren: () => import('./flws/flws.module').then(m => m.FlwsPageModule)
    },
    {
        path: 'psgs',
        loadChildren: () => import('./psgs/psgs.module').then(m => m.PsgsPageModule)
    },
    {
        path: 'update',
        loadChildren: () => import('./update/update.module').then(m => m.UpdatePageModule)
    },
    {
        path: 'config',
        loadChildren: () => import('./config/config.module').then(m => m.ConfigPageModule)
    },
    {
        path: 'avatar',
        loadChildren: () => import('./avatar/avatar.module').then(m => m.AvatarPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserPageRoutingModule {
}
