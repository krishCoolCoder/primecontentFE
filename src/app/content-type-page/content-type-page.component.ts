import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { DeleteConfirmationModalComponent } from '../modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { FilterModalComponent, ContentFilter } from '../modals/filter-modal/filter-modal.component';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, DeleteConfirmationModalComponent, FilterModalComponent],
  templateUrl: './content-type-page.component.html',
  styleUrl: './content-type-page.component.css'
})
export class ContentTypePageComponent implements OnInit {
  contentTypeList: any[] = [];
  selectedContentType: any = null;
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;
  currentFilters: ContentFilter | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.loadContentTypes();
  }

  loadContentTypes(filters?: ContentFilter) {
    const apiFilters = filters ? {
      contentType: filters.contentType || undefined,
      fromDate: filters.fromDate || undefined,
      toDate: filters.toDate || undefined
    } : undefined;

    this.apiService.getAllContentTypesDataWithFilters(apiFilters).subscribe({
      next: (response) => {
        console.log('Content types loaded:', response);
        this.contentTypeList = response;
      },
      error: (error) => {
        console.error('Error loading content types:', error);
      }
    });
  }

  redirectToCreateContentType() {
    this.router.navigate(['/createContentType']);
  }

  setGridView() {
    this.listView = false;
    this.gridView = true;
  }

  setListView() {
    this.listView = true;
    this.gridView = false;
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  viewContentType(contentType: any) {
    this.router.navigate(['/viewContentType', contentType._id]);
  }

  editContentType(contentType: any) {
    this.router.navigate(['/editContentType', contentType._id]);
  }

  deleteContentType(contentType: any) {
    this.selectedContentType = contentType;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
  }

  onConfirmDelete() {
    if (this.selectedContentType) {
      this.apiService.deleteContentType(this.selectedContentType._id).subscribe({
        next: (response) => {
          console.log('Content type deleted successfully:', response);
          this.loadContentTypes(this.currentFilters || undefined); // Refresh with current filters
          this.selectedContentType = null;
        },
        error: (error) => {
          console.error('Error deleting content type:', error);
          this.selectedContentType = null;
        }
      });
    }
  }

  onCancelDelete() {
    this.selectedContentType = null;
  }

  onApplyFilter(filters: ContentFilter) {
    this.currentFilters = filters;
    this.loadContentTypes(filters);
    this.closeFilter();
  }

  // Generate URL for content type
  generateContentTypeUrl(contentType: any): string {
    return `http://api.primecontent.in/api/content-types/list/${contentType.contentTypeName}`;
  }

  // Copy URL to clipboard
  copyUrl(contentType: any) {
    const url = this.generateContentTypeUrl(contentType);
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard');
      // You can add a toast notification here if needed
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  }

  // Copy cURL command to clipboard
  copyCurl(contentType: any) {
    const url = this.generateContentTypeUrl(contentType);
    const token = localStorage.getItem('token');
    const curlCommand = `curl -X GET "${url}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token || 'YOUR_TOKEN_HERE'}"`;
    
    navigator.clipboard.writeText(curlCommand).then(() => {
      console.log('cURL command copied to clipboard');
      // You can add a toast notification here if needed
    }).catch(err => {
      console.error('Failed to copy cURL command: ', err);
    });
  }

  // Copy create content cURL command to clipboard
  copyCreateContentCurl(contentType: any) {
    const baseUrl = 'localhost:3000'; // Matching the reference format
    const url = `${baseUrl}/api/contents`; // Note: 'contents' with 's'
    const token = localStorage.getItem('token');
    
    // Generate contentFields array based on content type fields
    const contentFields: any[] = [];
    
    if (contentType.contentTypeList && contentType.contentTypeList.length > 0) {
      contentType.contentTypeList.forEach((field: any) => {
        let sampleValue: any;
        
        switch (field.fieldType) {
          case 'String':
            sampleValue = field.fieldName === 'title' ? `My First ${contentType.contentTypeName}` : 
                         field.fieldName === 'author' ? 'John Doe' : 
                         `Sample ${field.fieldName}`;
            break;
          case 'Text':
            sampleValue = `This is the ${field.fieldName} of my first ${contentType.contentTypeName.toLowerCase()}.`;
            break;
          case 'Number':
            sampleValue = 123;
            break;
          case 'Boolean':
            sampleValue = true;
            break;
          case 'Date':
            sampleValue = new Date().toISOString();
            break;
          case 'Array':
            sampleValue = [`Sample ${field.fieldName} item 1`, `Sample ${field.fieldName} item 2`];
            break;
          case 'Object':
            sampleValue = { key: `Sample ${field.fieldName} value` };
            break;
          default:
            sampleValue = `Sample ${field.fieldName}`;
        }
        
        contentFields.push({
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          fieldValue: sampleValue
        });
      });
    }
    
    // Generate the payload matching the reference structure
    const samplePayload = {
      contentType: contentType.contentTypeName,
      contentTypeId: contentType._id,
      contentFields: contentFields
    };
    
    const curlCommand = `curl --location '${url}' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer ${token || 'YOUR_TOKEN_HERE'}' \\
--data '${JSON.stringify(samplePayload, null, 4)}'`;
    
    navigator.clipboard.writeText(curlCommand).then(() => {
      console.log('Create content cURL command copied to clipboard');
      // You can add a toast notification here if needed
    }).catch(err => {
      console.error('Failed to copy create content cURL command: ', err);
    });
  }

  // Permission checking methods
  canEditContentType(): boolean {
    return this.permissionService.hasUpdatePermission('contentType');
  }

  canDeleteContentType(): boolean {
    return this.permissionService.hasDeletePermission('contentType');
  }

  canCreateContentType(): boolean {
    return this.permissionService.hasCreatePermission('contentType');
  }
}
