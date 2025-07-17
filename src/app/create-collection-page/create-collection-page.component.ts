import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FilterField, CollectionCreateRequest } from '../models/collection.model';
import { ToastService } from '../shared/toast/toast.service';

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
    private apiService: ApiService,
    private toastService: ToastService
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
    return this.filterFields.some(filter => filter.fieldName && !filter.filterName);
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
      fieldName: '',
      filterName: '',
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
    
    // Auto-generate filterName based on fieldName if not already set
    if (selectedFieldName && !this.filterFields[index].filterName) {
      this.filterFields[index].filterName = selectedFieldName;
    }
    
    console.log("Filter field changed:", this.filterFields);
  }

  onFilterNameChange(event: any, index: number) {
    this.filterFields[index].filterName = event.target.value;
  }

  onMandatoryChange(event: any, index: number) {
    this.filterFields[index].isMandatory = event.target.checked;
    console.log("Mandatory status changed:", this.filterFields);
  }

  // Check if filter name is unique
  isFilterNameUnique(filterName: string, currentIndex: number): boolean {
    return !this.filterFields.some((filter, index) => 
      index !== currentIndex && filter.filterName === filterName
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
    let baseUrl = `https://api.primecontent.in/collection/${this.collectionName}/contents`;
    
    if (this.filterFields.length > 0) {
      const queryParams = this.filterFields
        .filter(filter => filter.fieldName && filter.filterName)
        .map(filter => `${filter.filterName}=${filter.fieldName}`)
        .join('&');
      
      if (queryParams) {
        baseUrl += `?${queryParams}`;
      }
    }
    
    return baseUrl;
  }

  // Validate form before creation
  canCreateCollection(): boolean {
    console.log('Validation check:', {
      collectionName: this.collectionName,
      selectedContentType: this.selectedContentType,
      filterFields: this.filterFields
    });
    
    if (!this.collectionName || !this.selectedContentType) {
      console.log('Missing collection name or content type');
      return false;
    }
    
    // Only validate filters if they exist
    // Allow collections without filters
    if (this.filterFields.length > 0) {
      for (const filter of this.filterFields) {
        if (!filter.fieldName || !filter.filterName) {
          console.log('Incomplete filter found:', filter);
          return false;
        }
      }
    }
    
    console.log('Validation passed');
    return true;
  }

  // Check for duplicate filter names
  hasDuplicateFilterNames(): boolean {
    if (this.filterFields.length === 0) {
      return false; // No filters means no duplicates
    }
    
    const filterNames = this.filterFields
      .filter(filter => filter.filterName) // Only check filters that have names
      .map(filter => filter.filterName);
    
    const hasDuplicates = filterNames.length !== new Set(filterNames).size;
    if (hasDuplicates) {
      console.log('Duplicate filter names found:', filterNames);
    }
    return hasDuplicates;
  }

  createCollection() {
    console.log('createCollection method called');
    console.log('Current form state:', {
      collectionName: this.collectionName,
      selectedContentType: this.selectedContentType,
      selectedContentTypeId: this.selectedContentTypeId,
      filterFields: this.filterFields
    });
    
    if (!this.canCreateCollection()) {
      console.log('Validation failed, showing alert');
      alert('Please fill in all required fields.');
      return;
    }
    
    if (this.hasDuplicateFilterNames()) {
      console.log('Duplicate filter names found, showing alert');
      alert('Filter names must be unique.');
      return;
    }
    
    console.log('Creating collection data...');
    const collectionData: CollectionCreateRequest = {
      collectionName: this.collectionName,
      api: this.generateApiUrl(),
      contentTypeId: this.selectedContentTypeId,
      filters: this.filterFields
    };
    
    console.log('Collection data to be sent:', collectionData);
    
    this.apiService.createCollection(collectionData).subscribe({
      next: (response) => {
        console.log("Collection created successfully:", response);
        this.toastService.showSuccess('Collection created successfully!');
        this.router.navigate(["/collection"]);
      },
      error: (error) => {
        console.error('Error creating collection:', error);
        this.error = 'Failed to create collection. Please try again.';
      }
    });
  }
}
