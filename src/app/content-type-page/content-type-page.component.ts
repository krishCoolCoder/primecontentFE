import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './content-type-page.component.html',
  styleUrl: './content-type-page.component.css'
})
export class ContentTypePageComponent {
  constructor(private router: Router){}
  redirectToCreateContentType(){
    this.router.navigate(["/createContentType"])
  }
}
