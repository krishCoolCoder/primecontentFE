import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-user-role-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent],
  templateUrl: './user-role-page.component.html',
  styleUrl: './user-role-page.component.css'
})
export class UserRolePageComponent implements OnInit {
  userRoles: any[] = [];
  isFilterOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.userRoles = JSON.parse(localStorage.getItem('userRoles') ?? '[]');
  }

  redirectToCreateUserRole() {
    this.router.navigate(['/createUserRole']);
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }
}
