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

  removeField(index: number) {
    if (this.contentType.contentTypeList.length > 1) {
      this.contentType.contentTypeList.splice(index, 1);
    }
  }

  createContentType() {
    if (this.contentType.contentTypeName.trim() && this.contentType.contentTypeList.length > 0) {
      const contentTypeData = {
        contentTypeName: this.contentType.contentTypeName,
        contentTypeList: this.contentType.contentTypeList
      };

      this.apiService.createContentType(contentTypeData).subscribe({
        next: (response) => {
          console.log('Content type created successfully:', response);
          this.router.navigate(['/contentType']);
        },
        error: (error) => {
          console.error('Error creating content type:', error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/contentType']);
  }
}
