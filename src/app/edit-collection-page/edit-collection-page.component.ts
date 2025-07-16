import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FilterField, Collection, CollectionUpdateRequest } from '../models/collection.model';

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
  selector: 'app-edit-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule, NgFor],
  templateUrl: './edit-collection-page.component.html',
  styleUrl: './edit-collection-page.component.css'
})
export class EditCollectionPageComponent implements OnInit {
  collectionId: string = '';
  collectionName: string = '';
  selectedContentType: string = '';
  selectedContentTypeId: string = '';
  contentTypeFields: ContentTypeField[] = [];
  filterFields: FilterField[] = [];
  isContentTypeSelected: boolean = false;
  contentTypeList: ContentType[] = [];
  loading: boolean = false;
  error: string | null = null;
  originalCollection: Collection | null = null;
  contentTypesLoaded: boolean = false;
  collectionLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.collectionId = params['id'];
      if (this.collectionId) {
        this.loadContentTypes();
      }
    });
  }

  // Convert spaces to hyphens in collection name (same as create page)
  onCollectionNameChange(input: string) {
    this.collectionName = input.replace(/\s+/g, "-");
  }

  loadContentTypes() {
    this.apiService.getAllContentTypesData().subscribe({
      next: (contentTypes) => {
        this.contentTypeList = contentTypes;
        this.contentTypesLoaded = true;
        console.log("Content types loaded:", this.contentTypeList);
        
        // Load collection data after content types are loaded
        this.loadCollection();
      },
      error: (error) => {
        console.error('Error loading content types:', error);
        this.error = 'Failed to load content types. Please try again.';
      }
    });
  }

  loadCollection() {
    if (!this.contentTypesLoaded) {
      return; // Wait for content types to load first
    }
    
    this.loading = true;
    this.error = null;
    
    this.apiService.getCollectionByIdData(this.collectionId).subscribe({
      next: (collection) => {
        this.originalCollection = collection;
        this.collectionName = collection.collectionName;
        
        // Handle contentTypeId which can be string or object
        if (typeof collection.contentTypeId === 'object' && collection.contentTypeId !== null) {
          this.selectedContentType = collection.contentTypeId.contentTypeName;
          this.selectedContentTypeId = collection.contentTypeId._id;
        } else {
          this.selectedContentTypeId = collection.contentTypeId as string;
          // Find the content type name from the loaded list
          const contentType = this.contentTypeList.find(ct => ct._id === this.selectedContentTypeId);
          this.selectedContentType = contentType ? contentType.contentTypeName : '';
        }
        
        this.filterFields = [...collection.filters];
        this.collectionLoaded = true;
        
        // Now populate content type fields since both content types and collection are loaded
        this.populateContentTypeFields();
        
        this.loading = false;
        console.log("Collection loaded and content type fields populated:", {
          selectedContentType: this.selectedContentType,
          selectedContentTypeId: this.selectedContentTypeId,
          contentTypeFields: this.contentTypeFields
        });
      },
      error: (error) => {
        console.error('Error loading collection:', error);
        this.error = 'Failed to load collection. Please try again.';
        this.loading = false;
      }
    });
  }

  // Populate content type fields after both content types and collection are loaded
  populateContentTypeFields() {
    if (this.selectedContentTypeId && this.contentTypeList.length > 0) {
      const selectedType = this.contentTypeList.find(
        (type) => type._id === this.selectedContentTypeId
      );
      
      if (selectedType) {
        this.contentTypeFields = selectedType.contentTypeList || [];
        this.isContentTypeSelected = true;
        console.log("Content type fields populated:", this.contentTypeFields);
      } else {
        console.warn("Selected content type not found in content types list");
        this.resetContentTypeSelection();
      }
    }
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
        console.log("Content type changed, fields updated:", this.contentTypeFields);
      }
    } else {
      this.resetContentTypeSelection();
    }
  }

  resetContentTypeSelection() {
    this.selectedContentType = '';
    this.selectedContentTypeId = '';
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

  // Copy text to clipboard
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('API URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

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

  canUpdateCollection(): boolean {
    if (!this.collectionName || !this.selectedContentType) {
      return false;
    }
    
    // Allow collections without filters or with complete filters
    if (this.filterFields.length > 0) {
      for (const filter of this.filterFields) {
        if (!filter.fieldName || !filter.filterName) {
          return false;
        }
      }
    }
    
    return true;
  }

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

  updateCollection() {
    if (!this.canUpdateCollection()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (this.hasDuplicateFilterNames()) {
      alert('Filter names must be unique.');
      return;
    }
    
    const updateData: CollectionUpdateRequest = {
      collectionName: this.collectionName,
      api: this.generateApiUrl(),
      contentTypeId: this.selectedContentTypeId,
      filters: this.filterFields
    };
    
    this.apiService.updateCollection(this.collectionId, updateData).subscribe({
      next: (response) => {
        console.log('Collection updated:', response);
        this.router.navigate(['/collection']);
      },
      error: (error) => {
        console.error('Error updating collection:', error);
        this.error = 'Failed to update collection. Please try again.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/collection']);
  }
} 