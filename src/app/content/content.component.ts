import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CreateContentModelComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  constructor(private router: Router){}
  redirectToCreateContent(){
    this.router.navigate(["/createContent"])
  }
}
