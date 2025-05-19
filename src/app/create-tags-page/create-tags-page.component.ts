import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './create-tags-page.component.html',
  styleUrl: './create-tags-page.component.css'
})
export class CreateTagsPageComponent {
  tagList = [
    {
      tagName: ""
    }
  ];
  addAnotherField() {
    this.tagList.push(
      {
        tagName: ""
      }
    )
  };
  createTag() {
    console.log("The contentTypeList is this : ", this.tagList);
  }

}
