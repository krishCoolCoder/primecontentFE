import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserRole } from '../models/user-role.model';

@Component({
  selector: 'app-user-access-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, NgIf, TitleCasePipe, RouterModule],
  templateUrl: './user-access-page.component.html',
  styleUrl: './user-access-page.component.css'
})
export class UserAccessPageComponent implements OnInit {
  userRoles: UserRole[] = [];
  loading = false;
  error: string | null = null;
  
  // Permission categories for better organization
  permissionCategories = [
    {
      name: 'Content',
      permissions: ['read', 'edit', 'delete']
    },
    {
      name: 'Content Type',
      permissions: ['read', 'edit', 'delete']
    },
    {
      name: 'Tag',
      permissions: ['read', 'edit', 'delete']
    },
    {
      name: 'Collection',
      permissions: ['read', 'edit', 'delete']
    },
    {
      name: 'User',
      permissions: ['read', 'edit', 'delete']
    },
    {
      name: 'User Role',
      permissions: ['read', 'edit', 'delete']
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getAllUserRoles().subscribe({
      next: (response: any) => {
        this.userRoles = response.data || [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading user roles:', error);
        this.error = 'Failed to load user roles. Please try again.';
        this.loading = false;
      }
    });
  }

  onPermissionChange(roleId: string, category: string, permission: string, event: any) {
    const isChecked = event.target.checked;
    console.log(`Role ${roleId}: ${category} ${permission} = ${isChecked}`);
    // TODO: Implement API call to update permissions
  }

  savePermissions() {
    // TODO: Implement save functionality
    console.log('Saving permissions...');
  }

  resetPermissions() {
    // TODO: Implement reset functionality
    console.log('Resetting permissions...');
  }
}
