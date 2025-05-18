import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-content-type-page',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent],
  templateUrl: './create-content-type-page.component.html',
  styleUrl: './create-content-type-page.component.css'
})
export class CreateContentTypePageComponent {

}
