import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './shared/toast/toast.component';
import { ApiService } from './services/api.service';
import { PermissionService } from './services/permission.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'primeContentFE';

  constructor(
    private apiService: ApiService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    // Check if user is logged in and load permissions automatically
    this.initializeUserPermissions();
  }

  private initializeUserPermissions() {
    console.log('App initializing - checking login status...');
    
    // Check if user is logged in (has token and user info)
    if (this.apiService.isLoggedIn()) {
      const userInfo = this.apiService.getUserInfo();
      console.log('User is logged in, loading permissions automatically:', userInfo);
      
      // Load permissions automatically on app initialization
      this.permissionService.loadUserPermissions().subscribe({
        next: (permissions) => {
          console.log('Permissions loaded on app initialization:', permissions);
        },
        error: (error) => {
          console.warn('Failed to load permissions on app initialization:', error);
        }
      });
    } else {
      console.log('User not logged in, skipping permission loading');
    }
  }
}
