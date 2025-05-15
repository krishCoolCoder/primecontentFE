import { Component } from '@angular/core';
import { LandingHeaderComponent } from './header/header.component';
import { Router } from '@angular/router';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingHeaderComponent, SignInPageComponent, SignUpPageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor (private router : Router) {

  }

  signInRedirect() {
    this.router.navigate(["/signIn"])
  }
  
  signUpRedirect() {
    this.router.navigate(["/signUp"])
  }

}
