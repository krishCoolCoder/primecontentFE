import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

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
  contentTypeFields : any = [];
  filterFields : any = [];
  isContentTypeSelected: boolean = false;

  contentTypeList: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.contentTypeList = JSON.parse(localStorage.getItem("contentTypeList") ?? "[]")
    console.log("The contentTypeFields is this from ngOnInit : ", this.contentTypeList)
  }

  onCollectionNameChange(input : string){
    this.collectionName = input.replace(/\s+/g, "-");
  }

  renderContentTypeFields(event: any) {
    this.isContentTypeSelected = true;
    console.log("The event.target.value is this : ", event.target.value)
      let contentTypeFields = this.contentTypeList.filter((data:any)=>{
        console.log("The contentType is this : ", data.contentTypeName, " and the event.target.value is this : ", event.target.value)
        return data.contentTypeName == event.target.value;
      });
      console.log("the contentypefields are : ", this.contentTypeFields)
      if (contentTypeFields.length > 0) {
        this.contentTypeFields = contentTypeFields[0]?.contentTypeList;
        console.log("Inside of an if and the this.contentType is this : ", this.contentTypeFields)
      } else {
        this.contentTypeFields = [];
        console.log("No matching contentType found");
      }
      console.log("the contentypefields are : ", this.contentTypeFields)

  }

  addfield() {
    this.filterFields.push(
      {
        fieldName : "",
        filterValue : ""
      }
    )
  }

  removeFilters() {
    this.filterFields = [];
  }

  onFilterValueChange(event : any, i: number){
    this.filterFields[i].filterValue = event.target.value;
    console.log("The filter fields on onFilterValueChange is this : ", this.filterFields)
  }
  onFilterFieldNameChange(event : any, i: number){
    this.filterFields[i].fieldName = event.target.value;
    console.log("The filter fields on onFilterFieldNameChange is this : ", this.filterFields)
  }

  createCollection() {
    let existingCollections = JSON.parse(localStorage.getItem("collections") ?? "[]");
    existingCollections.push(
      {
        collectionName : this.collectionName,
        api : "https://api.primecontent.in/collection/"+this.collectionName,
        contentType: this.selectedContentType,
        filters : this.filterFields
      }
    );
    console.log("The existingCollections is : ", existingCollections);
    localStorage.setItem("collections",
      JSON.stringify(existingCollections)
    );
    this.router.navigate(["/collection"])
  }
}
