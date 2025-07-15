import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface FilterField {
  fieldName: string;
  filterValue: string;
  isMandatory: boolean;
}

interface ContentTypeField {
  fieldName: string;
  fieldType: string;
  isRequired?: boolean;
}

interface ContentType {
  _id: string;
  contentTypeName: string;
  contentTypeList: ContentTypeField[];
}

@Component({
  selector: 'app-create-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule, NgFor],
  templateUrl: './create-collection-page.component.html',
  styleUrl: './create-collection-page.component.css'
})
export class CreateCollectionPageComponent implements OnInit {
  collectionName: string = "";
  selectedContentType: string = "";
  selectedContentTypeId: string = "";
  contentTypeFields: ContentTypeField[] = [];
  filterFields: FilterField[] = [];
  isContentTypeSelected: boolean = false;
  contentTypeList: ContentType[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    public router: Router,
    private apiService: ApiService
  ) {}

  // Copy text to clipboard
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('API URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // Check for incomplete filters
  hasIncompleteFilters(): boolean {
    return this.filterFields.some(filter => filter.fieldName && !filter.filterValue);
  }

  ngOnInit() {
    this.loadContentTypes();
  }

  loadContentTypes() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getAllContentTypesData().subscribe({
      next: (contentTypes) => {
        this.contentTypeList = contentTypes;
        this.loading = false;
        console.log("Content types loaded:", this.contentTypeList);
      },
      error: (error) => {
        console.error('Error loading content types:', error);
        this.error = 'Failed to load content types. Please try again.';
        this.loading = false;
      }
    });
  }

  onCollectionNameChange(input: string) {
    this.collectionName = input.replace(/\s+/g, "-");
  }

  onContentTypeChange(event: any) {
    const selectedContentTypeName = event.target.value;
    this.selectedContentType = selectedContentTypeName;
    
    if (selectedContentTypeName) {
      const selectedType = this.contentTypeList.find(
        (type) => type.contentTypeName === selectedContentTypeName
      );
      
      if (selectedType) {
        this.selectedContentTypeId = selectedType._id;
        this.contentTypeFields = selectedType.contentTypeList || [];
        this.isContentTypeSelected = true;
        // Clear existing filters when content type changes
        this.filterFields = [];
        console.log("Selected content type fields:", this.contentTypeFields);
      }
    } else {
      this.resetContentTypeSelection();
    }
  }

  resetContentTypeSelection() {
    this.selectedContentType = "";
    this.selectedContentTypeId = "";
    this.contentTypeFields = [];
    this.filterFields = [];
    this.isContentTypeSelected = false;
  }

  addFilter() {
    this.filterFields.push({
      fieldName: "",
      filterValue: "",
      isMandatory: false
    });
  }

  removeFilter(index: number) {
    this.filterFields.splice(index, 1);
  }

  clearAllFilters() {
    this.filterFields = [];
  }

  onFilterFieldChange(event: any, index: number) {
    const selectedFieldName = event.target.value;
    this.filterFields[index].fieldName = selectedFieldName;
    
    // Auto-populate filter value with field name if empty
    if (selectedFieldName && !this.filterFields[index].filterValue) {
      this.filterFields[index].filterValue = selectedFieldName;
    }
    
    console.log("Filter field changed:", this.filterFields);
  }

  onFilterValueChange(event: any, index: number) {
    this.filterFields[index].filterValue = event.target.value;
    console.log("Filter value changed:", this.filterFields);
  }

  onMandatoryChange(event: any, index: number) {
    this.filterFields[index].isMandatory = event.target.checked;
    console.log("Mandatory status changed:", this.filterFields);
  }

  // Check if filter name is unique
  isFilterNameUnique(filterValue: string, currentIndex: number): boolean {
    return !this.filterFields.some((filter, index) => 
      index !== currentIndex && filter.filterValue === filterValue
    );
  }

  // Get available fields for dropdown (excluding already selected ones)
  getAvailableFields(): ContentTypeField[] {
    return this.contentTypeFields.filter(field => 
      !this.filterFields.some(filter => filter.fieldName === field.fieldName)
    );
  }

  // Generate API URL with filters
  generateApiUrl(): string {
    let baseUrl = `https://api.primecontent.in/collection/${this.collectionName}`;
    
    if (this.filterFields.length > 0) {
      const queryParams = this.filterFields
        .filter(filter => filter.fieldName && filter.filterValue)
        .map(filter => `${filter.filterValue}=${filter.fieldName}${filter.isMandatory ? '&mandatory=true' : ''}`)
        .join('&');
      
      if (queryParams) {
        baseUrl += `?${queryParams}`;
      }
    }
    
    return baseUrl;
  }

  // Validate form before creation
  canCreateCollection(): boolean {
    if (!this.collectionName || !this.selectedContentType) {
      return false;
    }
    
    // Check if all filter fields have both fieldName and filterValue
    return this.filterFields.every(filter => 
      filter.fieldName && filter.filterValue
    );
  }

  // Check for duplicate filter names
  hasDuplicateFilterNames(): boolean {
    const filterNames = this.filterFields.map(filter => filter.filterValue);
    return filterNames.length !== new Set(filterNames).size;
  }

  createCollection() {
    if (!this.canCreateCollection()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (this.hasDuplicateFilterNames()) {
      alert('Filter names must be unique.');
      return;
    }
    
    const collectionData = {
      collectionName: this.collectionName,
      api: this.generateApiUrl(),
      contentType: this.selectedContentType,
      contentTypeId: this.selectedContentTypeId,
      filters: this.filterFields,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage (you can replace this with API call later)
    let existingCollections = JSON.parse(localStorage.getItem("collections") ?? "[]");
    existingCollections.push(collectionData);
    localStorage.setItem("collections", JSON.stringify(existingCollections));
    
    console.log("Collection created:", collectionData);
    this.router.navigate(["/collection"]);
  }
}
