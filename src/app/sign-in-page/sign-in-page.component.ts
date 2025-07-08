import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

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
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  signinForm  = new FormGroup(
    {
      email : new FormControl(""), 
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
    
    const credentials = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.apiService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        // Store token and user info
        this.apiService.setToken(response.data.token);
        this.apiService.setUserInfo(response.data.user);
        
        // Navigate to dashboard
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}
