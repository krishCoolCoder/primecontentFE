import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent, UserFilter } from '../modals/filter-modal/filter-modal.component';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isFilterOpen: boolean = false;
  currentFilters: UserFilter | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(filters?: UserFilter) {
    const apiFilters = filters ? {
      userRole: filters.userRole || undefined,
      userName: filters.userName || undefined,
      email: filters.email || undefined,
      fromDate: filters.fromDate || undefined,
      toDate: filters.toDate || undefined
    } : undefined;

    this.apiService.getUsersWithMappingFiltered(apiFilters).subscribe({
      next: (response) => {
        console.log('Users loaded:', response);
        this.users = response.data.reverse(); // Reverse to show recent users first
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  redirectToCreateUser() {
    this.router.navigate(['/createUsers']);
  }

  editUser(user: User) {
    console.log('Edit user clicked:', user);
    this.router.navigate(['/editUser', user._id]);
  }

  deleteUser(user: User) {
    console.log('Delete user clicked:', user);
    this.selectedUser = user;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteUserModal'));
    modal.show();
  }

  onConfirmDelete() {
    console.log('Confirm delete clicked for:', this.selectedUser);
    if (this.selectedUser && this.selectedUser._id) {
      this.apiService.deleteUser(this.selectedUser._id).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          
          // Hide the modal
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
          if (modal) {
            modal.hide();
          }
          
          // Reload users list
          this.loadUsers(this.currentFilters || undefined);
          this.selectedUser = null;
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  onCancelDelete() {
    console.log('Cancel delete clicked');
    this.selectedUser = null;
    // Hide the modal
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    if (modal) {
      modal.hide();
    }
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  onApplyFilter(filters: UserFilter) {
    console.log('Applying filters:', filters);
    this.currentFilters = filters;
    this.loadUsers(filters);
    this.closeFilter();
  }

  // Permission checking methods
  canEditUser(): boolean {
    return this.permissionService.hasUpdatePermission('user');
  }

  canDeleteUser(): boolean {
    return this.permissionService.hasDeletePermission('user');
  }

  canCreateUser(): boolean {
    return this.permissionService.hasCreatePermission('user');
  }
}
