import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
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
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
    createdAt: new Date()
  };

  isEditMode = false;
  userId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
        this.loadUserForEdit();
      }
    });
  }

  loadUserForEdit() {
    const user = this.userService.getUserById(this.userId);
    if (user) {
      this.user = { ...user };
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.userService.updateUser(this.user);
    } else {
      this.user.id = this.userService.generateId();
      this.user.createdAt = new Date();
      this.userService.saveUser(this.user);
    }
    this.router.navigate(['/users']);
  }

  redirectToUserPage() {
    this.router.navigate(['/users']);
  }
}
