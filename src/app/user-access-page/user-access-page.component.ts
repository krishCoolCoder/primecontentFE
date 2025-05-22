import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-access-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor],
  templateUrl: './user-access-page.component.html',
  styleUrl: './user-access-page.component.css'
})
export class UserAccessPageComponent {
  userRoles : any = [
    {
      roleName : "SuperAdmin"
    },
    {
      roleName : "Admin"
    },
    {
      roleName : "User"
    },
    {
      roleName : "Anonymous"
    }
  ]

}
