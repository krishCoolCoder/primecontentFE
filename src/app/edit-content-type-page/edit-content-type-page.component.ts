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

  updateContentType() {
    if (this.contentType.contentTypeName.trim() && this.contentType.contentTypeList.length > 0) {
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