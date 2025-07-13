import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UserRole } from '../models/user-role.model';

@Component({
  selector: 'app-create-user-role-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule],
  templateUrl: './create-user-role-page.component.html',
  styleUrl: './create-user-role-page.component.css'
})
export class CreateUserRolePageComponent implements OnInit {
  userRole: UserRole = {
    roleName: '',
    tags: '',
    isInherited: false,
    inHeritedRoleRef: ''
  };
  
  availableTags: any[] = [];
  availableUserRoles: UserRole[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;
  userRoleId: string = '';
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.checkMode();
    this.loadTags();
    this.loadUserRoles();
  }

  checkMode() {
    const url = this.router.url;
    this.isViewMode = url.includes('/viewUserRole/');
    this.isEditMode = url.includes('/editUserRole/');
    
    if (this.isEditMode || this.isViewMode) {
      this.userRoleId = this.route.snapshot.params['id'];
      this.loadUserRole();
    }
  }

  loadUserRole() {
    if (this.userRoleId) {
      this.apiService.getUserRoleByIdData(this.userRoleId).subscribe({
        next: (userRole) => {
          this.userRole = {
            ...userRole,
            tags: userRole.tags?._id || userRole.tags || '',
            inHeritedRoleRef: userRole.inHeritedRoleRef || ''
          };
        },
        error: (error) => {
          console.error('Error loading user role:', error);
          alert('Error loading user role data.');
        }
      });
    }
  }

  loadTags() {
    this.apiService.getAllTagsData().subscribe({
      next: (tags) => {
        this.availableTags = tags;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }

  loadUserRoles() {
    this.apiService.getAllUserRolesData().subscribe({
      next: (userRoles) => {
        this.availableUserRoles = userRoles;
      },
      error: (error) => {
        console.error('Error loading user roles:', error);
      }
    });
  }

  onSubmit() {
    if (!this.userRole.roleName.trim()) {
      alert('Role name is required');
      return;
    }

    this.loading = true;
    
    // Prepare the data for API call
    const userRoleData: any = {
      roleName: this.userRole.roleName.trim()
    };

    // Add optional fields only if they have values
    if (this.userRole.tags) {
      userRoleData.tags = this.userRole.tags;
    }
    
    if (this.userRole.isInherited) {
      userRoleData.isInherited = this.userRole.isInherited;
      if (this.userRole.inHeritedRoleRef) {
        userRoleData.inHeritedRoleRef = this.userRole.inHeritedRoleRef;
      }
    }

    const apiCall = this.isEditMode 
      ? this.apiService.updateUserRole(this.userRoleId, userRoleData)
      : this.apiService.createUserRole(userRoleData);

    apiCall.subscribe({
      next: (response) => {
        console.log(`User role ${this.isEditMode ? 'updated' : 'created'} successfully:`, response);
        this.router.navigate(['/userRole']);
      },
      error: (error) => {
        console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} user role:`, error);
        alert(`Error ${this.isEditMode ? 'updating' : 'creating'} user role. Please try again.`);
        this.loading = false;
      }
    });
  }
  
  redirectToUserRolePage() {
    this.router.navigate(['/userRole']);
  }

  getPageTitle(): string {
    if (this.isViewMode) return 'View User Role';
    if (this.isEditMode) return 'Edit User Role';
    return 'Create User Role';
  }

  getSubmitButtonText(): string {
    if (this.isEditMode) return 'Update Role';
    return 'Create Role';
  }
}
