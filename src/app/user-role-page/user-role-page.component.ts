import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';
import { ApiService } from '../services/api.service';
import { UserRole } from '../models/user-role.model';

@Component({
  selector: 'app-user-role-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent],
  templateUrl: './user-role-page.component.html',
  styleUrl: './user-role-page.component.css'
})
export class UserRolePageComponent implements OnInit {
  userRoles: UserRole[] = [];
  isFilterOpen: boolean = false;
  listView: boolean = true;
  gridView: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.loading = true;
    console.log('Loading user roles...');
    this.apiService.getAllUserRolesData().subscribe({
      next: (userRoles) => {
        console.log('User roles received:', userRoles);
        console.log('Number of roles:', userRoles.length);
        this.userRoles = userRoles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user roles:', error);
        this.loading = false;
      }
    });
  }

  redirectToCreateUserRole() {
    this.router.navigate(['/createUserRole']);
  }

  viewUserRole(role: UserRole) {
    this.router.navigate(['/viewUserRole', role._id]);
  }

  createUserRole(role: UserRole) {
    // Navigate to create page, potentially with the current role as a template or reference
    this.router.navigate(['/createUserRole'], { 
      queryParams: { template: role._id } 
    });
  }

  editUserRole(role: UserRole) {
    this.router.navigate(['/editUserRole', role._id]);
  }

  deleteUserRole(userRole: UserRole) {
    if (confirm(`Are you sure you want to delete the user role "${userRole.roleName}"?`)) {
      this.apiService.deleteUserRole(userRole._id!).subscribe({
        next: () => {
          this.loadUserRoles(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting user role:', error);
          alert('Error deleting user role. Please try again.');
        }
      });
    }
  }

  setGridView() {
    this.listView = false;
    this.gridView = true;
  }

  setListView() {
    this.listView = true;
    this.gridView = false;
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  // Helper method to check if tags is an object with tagName
  isTagObject(tags: any): boolean {
    return tags && typeof tags === 'object' && tags.tagName;
  }

  // Helper method to get tag name safely
  getTagName(tags: any): string {
    if (this.isTagObject(tags)) {
      return tags.tagName;
    }
    return '';
  }
}
