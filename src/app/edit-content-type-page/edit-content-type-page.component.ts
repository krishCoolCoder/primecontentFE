import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentTypeService } from '../services/content-type.service';
import { ContentType, ContentTypeField } from '../models/content-type.model';

@Component({
  selector: 'app-edit-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './edit-content-type-page.component.html',
  styleUrl: './edit-content-type-page.component.css'
})
export class EditContentTypePageComponent implements OnInit {
  contentType: ContentType = {
    id: '',
    contentTypeName: '',
    contentTypeList: [{ fieldName: '', fieldType: 'String' }],
    createdAt: new Date()
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentTypeService: ContentTypeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const existingContentType = this.contentTypeService.getContentTypeById(params['id']);
        if (existingContentType) {
          this.contentType = { ...existingContentType };
        } else {
          this.router.navigate(['/contentType']);
        }
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
      this.contentTypeService.updateContentType(this.contentType);
      this.router.navigate(['/contentType']);
    }
  }

  cancel() {
    this.router.navigate(['/contentType']);
  }
} 