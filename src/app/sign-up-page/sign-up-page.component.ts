import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

  constructor(private router : Router) {}

  signInRedirect () {
    this.router.navigate(["/signIn"])
  }

  login() {
    this.router.navigate(["/dashboard"])
  }
}
