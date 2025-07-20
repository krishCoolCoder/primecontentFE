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
    this.loadUserRoles();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
        this.loadUserForEdit();
      }
    });
  }

  loadUserRoles() {
    this.apiService.getAllUserRolesData().subscribe({
      next: (userRoles) => {
        this.userRoles = userRoles;
        console.log('User roles loaded:', userRoles);
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
        
        console.log('User object after assignment:', this.user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit() {
    console.log('Submitting user data:', this.user);
    
    if (this.isEditMode) {
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
    
    this.user.userRoleId = selectedUserRoleId;
    
    // Find the selected role to set the role name
    const selectedRole = this.userRoles.find(role => role._id === selectedUserRoleId);
    if (selectedRole) {
      this.user.role = selectedRole.roleName;
    }
    
    console.log('Role changed:', {
      userRoleId: this.user.userRoleId,
      role: this.user.role
    });
  }

  redirectToUserPage() {
    this.router.navigate(['/users']);
  }
}
