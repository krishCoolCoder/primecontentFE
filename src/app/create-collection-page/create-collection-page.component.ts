import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-create-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule, NgFor],
  templateUrl: './create-collection-page.component.html',
  styleUrl: './create-collection-page.component.css'
})
export class CreateCollectionPageComponent {
  collectionName:string = "";
  selectedContentType:string = "";
  contentTypeFields : any;

  contentTypeList = [
    {
      contentType : "Blog",
      contentData : [
    {
      fieldName: "testing one",
      fieldType: "String"
    },
    {
      fieldName: "testing two",
      fieldType: "String"
    }
  ]
  },
  ];

  onCollectionNameChange(input : string){
    this.collectionName = input.replace(/\s+/g, "-");
  }

  renderContentTypeFields(event: any) {
    console.log("The event.target.value is this : ", event.target.value)
      let contentTypeFields = this.contentTypeList.filter((data)=>{
        console.log("The contentType is this : ", data.contentType, " and the event.target.value is this : ", event.target.value)
        return data.contentType == event.target.value;
      });
      console.log("the contentypefields are : ", this.contentTypeFields)
      if (contentTypeFields.length > 0) {
        this.contentTypeFields = contentTypeFields[0]?.contentData;
        console.log("The contentTypeFields are:", this.contentTypeFields);
      } else {
        this.contentTypeFields = [];
        console.log("No matching contentType found");
      }
      console.log("the contentypefields are : ", this.contentTypeFields)

  }

}
