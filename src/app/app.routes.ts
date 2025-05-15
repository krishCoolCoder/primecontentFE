import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeaderComponent } from './landing-page/header/header.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path : "", 
        component : LandingPageComponent
    },
    {
        path : "test",
        component : LandingHeaderComponent
    }, 
    {
        path : "signIn", 
        component : SignInPageComponent
    }, 
    {
        path : "signUp",
        component : SignUpPageComponent
    }, 
    {
        path : "dashboard",
        component : DashboardComponent
    }
];
