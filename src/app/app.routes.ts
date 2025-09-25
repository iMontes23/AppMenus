import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './security/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaErrorComponent } from './shared/pagina-error/pagina-error.component';
import { UrlConstante } from './utilerias/constantes/url-constante';
import { MenuAppLayoutComponent } from './layouts/menu-app/menu-app-layout.component';

export const routes: Routes = [

    {
        path: '', redirectTo: 'home', pathMatch: 'full',
    },
    {
        // path: '', component: MenuAppLayoutComponent, children: [ 
            path: '', component: MenuAppLayoutComponent, canActivate: [AuthGuard],children: [
            { path: UrlConstante.HOME, component: DashboardComponent }
        ]
    },
    {
        path: UrlConstante.TAB_APLICATION + ':name', component: AdminLayoutComponent, children: [
            { path: '', component: DashboardComponent }
        ]
    },
    {
        path: UrlConstante.NOT_FOUND, component: PaginaErrorComponent, data: { code: '404' },
    },
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: UrlConstante.SECURITY, component: PaginaErrorComponent, data: { code: "401" } },
            { path: UrlConstante.NOT_SPECIFIED, component: PaginaErrorComponent },
        ]
    },
    {
        path: '**', redirectTo: UrlConstante.HOME
    },
];
