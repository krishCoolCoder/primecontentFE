import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { BulkUploadModalComponent } from '../modals/bulk-upload-modal/bulk-upload-modal.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, BulkUploadModalComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

  constructor (private router: Router) {}

  redirectToCreateUsersPage() {
    this.router.navigate(["/createUsers"])
  }

}
