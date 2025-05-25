import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './create-tags-page.component.html',
  styleUrl: './create-tags-page.component.css'
})
export class CreateTagsPageComponent {
  tag = { tagName: "" };
  constructor(private router: Router){}

  createTag() {
    console.log("The contentTypeList is this : ", this.tag);
    let existingContent = JSON.parse(localStorage.getItem("tags")??"[]");
    existingContent.push(this.tag);
    localStorage.setItem("tags",JSON.stringify(existingContent));
    this.router.navigate(["/tag"])
  }
  redirectToTagList(){
    this.router.navigate(["/tag"])
  }

}
