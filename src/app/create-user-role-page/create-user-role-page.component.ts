import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-user-role-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './create-user-role-page.component.html',
  styleUrl: './create-user-role-page.component.css'
})
export class CreateUserRolePageComponent {
  constructor(private router: Router){}
  
    redirectToUserRolePage() {
      this.router.navigate(["/users"])
    }
}
