import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './edit-content-page.component.html',
  styleUrl: './edit-content-page.component.css'
})
export class EditContentPageComponent implements OnInit {
  content: any = null;
  contentId: string = '';
  editedContent: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentId = params['id'];
      this.loadContent();
    });
  }

  loadContent() {
    const contentList = JSON.parse(localStorage.getItem('content') ?? '[]');
    
    // First try to find by ID
    this.content = contentList.find((item: any) => item.id === this.contentId);
    
    // If not found by ID, try to find by content type
    if (!this.content) {
      this.content = contentList.find((item: any) => item.contentType === this.contentId);
    }
    
    // If still not found, try to find by unique identifier (content type + field values)
    if (!this.content) {
      this.content = contentList.find((item: any) => {
        const fieldValues = item.contentFields.map((field: any) => `${field.fieldName}:${field.fieldValue}`).join('|');
        const uniqueId = `${item.contentType}-${fieldValues}`;
        return uniqueId === this.contentId;
      });
    }
    
    if (!this.content) {
      this.router.navigate(['/content']);
      return;
    }

    // Create a copy for editing
    this.editedContent = {
      ...this.content,
      contentFields: [...this.content.contentFields]
    };
  }

  saveContent() {
    if (!this.editedContent) return;

    const contentList = JSON.parse(localStorage.getItem('content') ?? '[]');
    
    // Find the content to update using the same logic as loadContent
    let index = contentList.findIndex((item: any) => item.id === this.contentId);
    
    // If not found by ID, try to find by content type
    if (index === -1) {
      index = contentList.findIndex((item: any) => item.contentType === this.contentId);
    }
    
    // If still not found, try to find by unique identifier
    if (index === -1) {
      index = contentList.findIndex((item: any) => {
        const fieldValues = item.contentFields.map((field: any) => `${field.fieldName}:${field.fieldValue}`).join('|');
        const uniqueId = `${item.contentType}-${fieldValues}`;
        return uniqueId === this.contentId;
      });
    }
    
    if (index !== -1) {
      contentList[index] = this.editedContent;
      localStorage.setItem('content', JSON.stringify(contentList));
      this.router.navigate(['/content']);
    }
  }

  cancel() {
    this.router.navigate(['/content']);
  }
} 