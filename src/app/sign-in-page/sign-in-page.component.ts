import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  constructor (private router: Router) {}

  signUpRedirect () {
    this.router.navigate(["/signUp"])
  }

  login() {
    this.router.navigate(["/dashboard"])
  }

}
