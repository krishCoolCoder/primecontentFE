import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-content-type-page',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './create-content-type-page.component.html',
  styleUrl: './create-content-type-page.component.css'
})
export class CreateContentTypePageComponent {
  contentTypeName: any;
  fieldName:any;
  contentTypeList = [
    {
      fieldName: "",
      fieldType: "String"
    }
  ];
  addAnotherField() {
    this.contentTypeList.push(
      {
        fieldName: "",
        fieldType: "String"
      }
    )
  };
  createContentType() {
    console.log("The contentTypeList is this : ", this.contentTypeList);
    let existingContentTypeList: any = JSON.parse(localStorage.getItem("contentTypeList") ?? "[]");
    console.log("The existingContentTypeList is this : ", existingContentTypeList)
    localStorage.setItem("contentTypeList", JSON.stringify([...existingContentTypeList,
      {
        contentTypeName : this.contentTypeName,
        // contentTypeList : [this.contentTypeList, ...existingContentTypeList]
        contentTypeList : this.contentTypeList
      }
    ]
    ));
    console.log("after saving contentTypeList in localStorage is this : ", JSON.parse(localStorage.getItem("contentTypeList") ?? "[]"))
  }
}
