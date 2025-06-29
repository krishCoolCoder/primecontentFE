import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { BulkUploadModalComponent } from '../modals/bulk-upload-modal/bulk-upload-modal.component';
import { ViewUserModalComponent } from '../modals/view-user-modal/view-user-modal.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, BulkUploadModalComponent, ViewUserModalComponent, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  redirectToCreateUsersPage() {
    this.router.navigate(['/createUsers']);
  }

  viewUser(user: User) {
    this.selectedUser = user;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('viewUserModal'));
    modal.show();
  }

  editUser(user: User) {
    this.router.navigate(['/editUser', user.id]);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id);
      this.loadUsers();
    }
  }
}
