import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {
  constructor(private router: Router){}

  redirectToCreateCollection() {
    this.router.navigate(["/createCollection"])
  }

}
