import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, FormsModule, NgIf],
  templateUrl: './create-content-page.component.html',
  styleUrl: './create-content-page.component.css'
})
export class CreateContentPageComponent implements OnInit {
  contentTypeList: any[] = [];
  selectedContentType: any = null; // Changed to store the entire content type object
  selectedContentTypeName: string = "Default";
  contentFields: any[] = [];
  tagList: any[] = [];
  selectedTagType: string = "Default Tag";

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadContentTypes();
    this.loadTags();
  }

  loadContentTypes() {
    this.apiService.getAllContentTypesData().subscribe({
      next: (response) => {
        console.log('Content types loaded:', response);
        this.contentTypeList = response;
      },
      error: (error) => {
        console.error('Error loading content types:', error);
      }
    });
  }

  loadTags() {
    this.apiService.getAllTagsData().subscribe({
      next: (response) => {
        console.log('Tags loaded:', response);
        this.tagList = response;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }

  contentTypeSelected(event: any) {
    this.selectedContentTypeName = event.target.value;
    console.log("The selected content type name is: ", this.selectedContentTypeName);
    
    if (this.selectedContentTypeName === "Default") {
      this.selectedContentType = null;
      this.contentFields = [];
      return;
    }

    // Find the selected content type object
    this.selectedContentType = this.contentTypeList.find((contentType: any) => 
      contentType.contentTypeName === this.selectedContentTypeName
    );

    if (this.selectedContentType) {
      console.log("Selected content type object:", this.selectedContentType);
      console.log("Content type ID:", this.selectedContentType._id);
      
      // Initialize content fields based on the content type's field definitions
      this.contentFields = this.selectedContentType.contentTypeList.map((field: any) => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        fieldValue: "" // Initialize with empty value
      }));
      
      console.log("Initialized content fields:", this.contentFields);
    } else {
      this.contentFields = [];
      console.log("No matching content type found");
    }
  }

  contentTagSelected(event: any) {
    this.selectedTagType = event.target.value;
  }

  getFieldValue(event: any, index: number) {
    this.contentFields[index]["fieldValue"] = event.target.value;
  }

  createContent() {
    console.log("Creating content with data:", {
      contentType: this.selectedContentTypeName,
      contentTypeId: this.selectedContentType?._id,
      contentTag: this.selectedTagType,
      contentFields: this.contentFields
    });

    // Validate that a content type is selected
    if (!this.selectedContentType) {
      console.error("Please select a content type");
      return;
    }

    const contentData = {
      contentType: this.selectedContentTypeName,
      contentTypeId: this.selectedContentType._id, // Include content type ID
      tagName: this.selectedTagType !== "Default Tag" ? this.selectedTagType : undefined,
      contentFields: this.contentFields.map((field: any) => ({
        fieldName: field.fieldName,
        fieldValue: field.fieldValue || "",
        fieldType: field.fieldType
      }))
    };

    this.apiService.createContent(contentData).subscribe({
      next: (response) => {
        console.log('Content created successfully:', response);
        this.router.navigate(["/content"]);
      },
      error: (error) => {
        console.error('Error creating content:', error);
      }
    });
  }
}
