import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './edit-content-type-page.component.html',
  styleUrl: './edit-content-type-page.component.css'
})
export class EditContentTypePageComponent implements OnInit {
  contentType: any = {
    contentTypeName: '',
    contentTypeList: [{ fieldName: '', fieldType: 'String' }]
  };
  contentTypeId: string = '';
  
  // Modal properties for field deletion
  showDeleteModal: boolean = false;
  fieldToDelete: any = null;
  fieldIndexToDelete: number = -1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.contentTypeId = params['id'];
        this.loadContentType();
      }
    });
  }

  loadContentType() {
    this.apiService.getContentTypeByIdData(this.contentTypeId).subscribe({
      next: (response: any) => {
        console.log('Content type loaded:', response);
        this.contentType = {
          contentTypeName: response.contentTypeName,
          contentTypeList: response.contentTypeList || [{ fieldName: '', fieldType: 'String' }]
        };
      },
      error: (error: any) => {
        console.error('Error loading content type:', error);
        this.router.navigate(['/contentType']);
      }
    });
  }

  addAnotherField() {
    this.contentType.contentTypeList.push({
      fieldName: '',
      fieldType: 'String'
    });
  }

  removeField(index: number) {
    if (this.contentType.contentTypeList.length > 1) {
      this.contentType.contentTypeList.splice(index, 1);
    }
  }

  // New method to show delete confirmation modal
  confirmDeleteField(index: number) {
    if (this.contentType.contentTypeList.length <= 1) {
      // Cannot delete the last field
      return;
    }
    
    this.fieldIndexToDelete = index;
    this.fieldToDelete = { ...this.contentType.contentTypeList[index] };
    this.showDeleteModal = true;
  }

  // Execute the field deletion
  executeDeleteField() {
    if (this.fieldIndexToDelete >= 0 && this.contentType.contentTypeList.length > 1) {
      this.contentType.contentTypeList.splice(this.fieldIndexToDelete, 1);
      console.log(`Field "${this.fieldToDelete?.fieldName}" deleted successfully`);
    }
    
    // Reset modal state
    this.cancelDeleteField();
  }

  // Cancel field deletion
  cancelDeleteField() {
    this.showDeleteModal = false;
    this.fieldToDelete = null;
    this.fieldIndexToDelete = -1;
  }

  updateContentType() {
    if (this.contentType.contentTypeName.trim() && this.contentType.contentTypeList.length > 0) {
      // Validate that all fields have names
      const hasEmptyFields = this.contentType.contentTypeList.some((field: any) => !field.fieldName.trim());
      if (hasEmptyFields) {
        alert('Please fill in all field names before updating.');
        return;
      }

      const contentTypeData = {
        contentTypeName: this.contentType.contentTypeName,
        contentTypeList: this.contentType.contentTypeList
      };

      this.apiService.updateContentType(this.contentTypeId, contentTypeData).subscribe({
        next: (response) => {
          console.log('Content type updated successfully:', response);
          this.router.navigate(['/contentType']);
        },
        error: (error) => {
          console.error('Error updating content type:', error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/contentType']);
  }
} 