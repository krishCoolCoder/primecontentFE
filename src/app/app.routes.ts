import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeaderComponent } from './landing-page/header/header.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard, noAuthGuard } from './auth.guard';
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
    {
        path : "", 
        component : LandingPageComponent,
        canActivate: [noAuthGuard]
    },
    {
        path : "test",
        component : LandingHeaderComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "signIn", 
        component : SignInPageComponent,
        canActivate: [noAuthGuard]
    }, 
    {
        path : "signUp",
        component : SignUpPageComponent,
        canActivate : [noAuthGuard]
    }, 
    {
        path : "dashboard",
        component : DashboardComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "content",
        component : ContentComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "contentType",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "tag",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "collection",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "users",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "userAccess",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "userRole",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "settings",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
];
