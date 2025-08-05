import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-content-type-page',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './create-content-type-page.component.html',
  styleUrl: './create-content-type-page.component.css'
})
export class CreateContentTypePageComponent {
  contentType: any = {
    contentTypeName: '',
    contentTypeList: [{ fieldName: '', fieldType: 'String' }]
  };

  showDeleteModal: boolean = false;
  fieldToDelete: any = null;
  fieldIndexToDelete: number = -1;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  addAnotherField() {
    this.contentType.contentTypeList.push({
      fieldName: '',
      fieldType: 'String'
    });
  }

  confirmDeleteField(index: number) {
    if (this.contentType.contentTypeList.length <= 1) {
      // Cannot delete the last field
      return;
    }
    this.fieldIndexToDelete = index;
    this.fieldToDelete = { ...this.contentType.contentTypeList[index] };
    this.showDeleteModal = true;
  }

  executeDeleteField() {
    if (this.fieldIndexToDelete >= 0 && this.contentType.contentTypeList.length > 1) {
      this.contentType.contentTypeList.splice(this.fieldIndexToDelete, 1);
    }
    this.cancelDeleteField();
  }

  cancelDeleteField() {
    this.showDeleteModal = false;
    this.fieldToDelete = null;
    this.fieldIndexToDelete = -1;
  }

  removeField(index: number) {
    if (this.contentType.contentTypeList.length > 1) {
      this.contentType.contentTypeList.splice(index, 1);
    }
  }

  createContentType() {
    if (this.contentType.contentTypeName.trim() && this.contentType.contentTypeList.length > 0) {
      // Validate that all fields have names
      const hasEmptyFields = this.contentType.contentTypeList.some((field: any) => !field.fieldName.trim());
      if (hasEmptyFields) {
        alert('Please fill in all field names before creating the content type.');
        return;
      }

      const contentTypeData = {
        contentTypeName: this.contentType.contentTypeName,
        contentTypeList: this.contentType.contentTypeList
      };

      console.log('Creating content type with data:', contentTypeData);

      this.apiService.createContentType(contentTypeData).subscribe({
        next: (response) => {
          console.log('Content type created successfully:', response);
          this.router.navigate(['/contentType']);
        },
        error: (error) => {
          console.error('Error creating content type:', error);
        }
      });
    } else {
      alert('Please provide a content type name and at least one field.');
    }
  }

  cancel() {
    this.router.navigate(['/contentType']);
  }
}
