import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-role-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './user-role-page.component.html',
  styleUrl: './user-role-page.component.css'
})
export class UserRolePageComponent {
  constructor(private router: Router){}

  redirectToCreateUserRole() {
    this.router.navigate(["/createUserRole"])
  }

}
