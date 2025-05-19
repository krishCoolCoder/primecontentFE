import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.css'
})
export class TagsPageComponent {
  constructor(private router: Router) {}
  redirectToCreateTagPage(){
    this.router.navigate(["/createTagPage"])
  }

}
