import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  constructor (
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  signinForm  = new FormGroup(
    {
      userId : new FormControl(""), 
      password : new FormControl("")
    }
  )

  signIn() {

  }

  signUpRedirect () {
    this.router.navigate(["/signUp"])
  }

  login() {
    console.log('The value of login function call is this : ', this.signinForm.value);
    if (this.signinForm.value.userId=="saikrishnatechno@gmail.com" && 
      this.signinForm.value.password=="admin"
    ) {
      localStorage.setItem("userInfo", JSON.stringify(
        {
          userId : this.signinForm.value.userId,
          password : this.signinForm.value.password
        }
      ))
      this.router.navigate(["/dashboard"])
    } else {
      this.router.navigate(["/"])
    }
  }

}
