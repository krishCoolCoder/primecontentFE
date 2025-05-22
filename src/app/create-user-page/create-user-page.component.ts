import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.css'
})
export class CreateUserPageComponent {
  constructor(private router: Router){}

  redirectToUserPage() {
    this.router.navigate(["/users"])
  }
}
