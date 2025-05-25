import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, FormsModule, NgIf],
  templateUrl: './create-content-page.component.html',
  styleUrl: './create-content-page.component.css'
})
export class CreateContentPageComponent {
  contentTypeList : any;
  selectedContentType: string ="Default";
  contentFields : any = [];
  tagList: any;
  selectedTagType: string = "Default Tag"

  constructor(private router: Router){}
  ngOnInit() {
    this.contentTypeList = JSON.parse(localStorage.getItem("contentTypeList") ?? "[]");
    this.tagList = JSON.parse(localStorage.getItem("tags")??"[]");
  }
  contentTypeSelected(event: any){
    this.selectedContentType = event.target.value;
    console.log("The selected content type is this : ", this.selectedContentType)
    this.contentFields = this.contentTypeList.find((data: any)=>data.contentTypeName==this.selectedContentType).contentTypeList;
    console.log("The contentFields is this : ", this.contentFields)
  }
  contentTagSelected(event: any){
    this.selectedTagType = event.target.value;
  }
  getFieldValue(event: any, index: number) {
    this.contentFields[index]["fieldValue"] = event.target.value;
  }

  createContent() {
    let existingContent = JSON.parse(localStorage.getItem("content")?? "[]");
    existingContent.push({
      contentType : this.selectedContentType,
      contentFields : this.contentFields
    })
    localStorage.setItem("content", JSON.stringify(existingContent 
  ))
    console.log("The content to be created is this : ", 
      {
        contentType : this.selectedContentType,
        contentTag : this.selectedTagType,
        contentFields : this.contentFields
      }
    )
    this.router.navigate(["/content"])
  }
}
