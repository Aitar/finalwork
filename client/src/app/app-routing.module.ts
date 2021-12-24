import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        canLoad: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
    },
    {
        path: 'user/:userId',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'psg/:psgId',
        loadChildren: () => import('./psg/psg.module').then(m => m.PsgPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'report/:entity/:id',
        loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule),
        canLoad: [AuthGuard]
    },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
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
