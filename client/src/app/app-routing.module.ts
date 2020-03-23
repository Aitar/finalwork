import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
    },
    {
        path: 'user/:userId',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
    },
    {
        path: 'psg/:psgId',
        loadChildren: () => import('./psg/psg.module').then(m => m.PsgPageModule)
    },
    {
        path: 'report/:entity/:id',
        loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
