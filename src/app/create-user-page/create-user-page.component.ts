import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.css'
})
export class CreateUserPageComponent implements OnInit {
  user: User = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
    userRoleId: '',
    createdAt: new Date()
  };

  userRoles: UserRole[] = [];
  isEditMode = false;
  userId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
      }
    });
    
    // Load user roles first, then load user for edit if needed
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.apiService.getAllUserRolesData().subscribe({
      next: (userRoles) => {
        this.userRoles = userRoles;
        console.log('User roles loaded:', userRoles);
        
        // After user roles are loaded, load user for edit if in edit mode
        if (this.isEditMode && this.userId) {
          this.loadUserForEdit();
        }
      },
      error: (error) => {
        console.error('Error loading user roles:', error);
      }
    });
  }

  loadUserForEdit() {
    this.apiService.getUserByIdWithMapping(this.userId).subscribe({
      next: (response) => {
        console.log('User loaded for edit:', response);
        console.log('Available user fields:', Object.keys(response.data));
        console.log('Username field value:', response.data.username);
        
        this.user = { 
          ...response.data,
          // Ensure username is set, fallback to email if username doesn't exist
          username: response.data.username || response.data.email || '',
          // Make sure password is empty for edit mode (security)
          password: '',
          // Ensure userRoleId is set
          userRoleId: response.data.userRoleId || ''
        };
        
        // Find and set the role name based on userRoleId
        if (this.user.userRoleId && this.userRoles.length > 0) {
          const userRole = this.userRoles.find(role => role._id === this.user.userRoleId);
          if (userRole) {
            this.user.role = userRole.roleName;
            console.log('Set role name for edit mode:', this.user.role);
          } else {
            console.warn('Could not find role name for userRoleId:', this.user.userRoleId);
            this.user.role = response.data.role || ''; // Fallback to API response role if available
          }
        } else {
          this.user.role = response.data.role || ''; // Fallback to API response role if available
        }
        
        console.log('User object after assignment and role mapping:', this.user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit() {
    console.log('=== USER SUBMISSION DEBUG ===');
    console.log('User data being submitted:', this.user);
    console.log('userRoleId specifically:', this.user.userRoleId);
    console.log('role specifically:', this.user.role);
    console.log('Is edit mode:', this.isEditMode);
    
    // Validate that userRoleId is selected for create mode
    if (!this.isEditMode && (!this.user.userRoleId || this.user.userRoleId.trim() === '')) {
      alert('Please select a user role before creating the user.');
      return;
    }
    
    // Validate that userRoleId is selected for edit mode too
    if (this.isEditMode && (!this.user.userRoleId || this.user.userRoleId.trim() === '')) {
      alert('Please select a user role before updating the user.');
      return;
    }
    
    // Additional validation to ensure role name is also set
    if (!this.user.role || this.user.role.trim() === '') {
      console.warn('Role name is missing, trying to find it from userRoleId...');
      const selectedRole = this.userRoles.find(role => role._id === this.user.userRoleId);
      if (selectedRole) {
        this.user.role = selectedRole.roleName;
        console.log('Found and set role name:', this.user.role);
      } else {
        alert('Unable to determine role name. Please reselect the user role.');
        return;
      }
    }
    
    if (this.isEditMode) {
      console.log('Updating user with data:', this.user);
      this.apiService.updateUserWithMapping(this.user._id!, this.user).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      console.log('Creating user with data:', this.user);
      this.apiService.createUserWithMapping(this.user).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    }
  }

  onRoleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedUserRoleId = target.value;
    
    console.log('=== ROLE CHANGE DEBUG ===');
    console.log('Selected userRoleId:', selectedUserRoleId);
    console.log('Available userRoles:', this.userRoles);
    
    this.user.userRoleId = selectedUserRoleId;
    
    // Find the selected role to set the role name
    const selectedRole = this.userRoles.find(role => role._id === selectedUserRoleId);
    console.log('Found selectedRole:', selectedRole);
    
    if (selectedRole) {
      this.user.role = selectedRole.roleName;
      console.log('Set role name to:', this.user.role);
    } else {
      console.warn('No role found for userRoleId:', selectedUserRoleId);
      this.user.role = ''; // Clear role if not found
    }
    
    console.log('Final user object after role change:', {
      userRoleId: this.user.userRoleId,
      role: this.user.role,
      fullUser: this.user
    });
  }

  redirectToUserPage() {
    this.router.navigate(['/users']);
  }
}
