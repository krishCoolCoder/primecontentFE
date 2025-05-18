import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './create-content-page.component.html',
  styleUrl: './create-content-page.component.css'
})
export class CreateContentPageComponent {

}
