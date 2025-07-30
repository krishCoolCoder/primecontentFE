import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private permissionService: PermissionService
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
        
        // Load user permissions after successful login
        this.permissionService.loadUserPermissions().subscribe({
          next: (permissions) => {
            console.log('Permissions loaded after login:', permissions);
            // Navigate to dashboard after permissions are loaded
            this.router.navigate(["/dashboard"]);
          },
          error: (permissionError) => {
            console.warn('Failed to load permissions, proceeding anyway:', permissionError);
            // Navigate to dashboard even if permissions fail to load
            this.router.navigate(["/dashboard"]);
          }
        });
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}