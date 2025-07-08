import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Content } from '../models/content.model';

@Component({
  selector: 'app-edit-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './edit-content-page.component.html',
  styleUrl: './edit-content-page.component.css'
})
export class EditContentPageComponent implements OnInit {
  content: Content | null = null;
  contentId: string = '';
  editedContent: Content | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentId = params['id'];
      this.loadContent();
    });
  }

  loadContent() {
    this.apiService.getContentByIdData(this.contentId).subscribe({
      next: (response) => {
        console.log('Content loaded for edit:', response);
        this.content = response;
        
        // Create a copy for editing
        if (this.content) {
          this.editedContent = {
            ...this.content,
            contentFields: [...this.content.contentFields]
          };
        }
      },
      error: (error) => {
        console.error('Error loading content:', error);
        this.router.navigate(['/content']);
      }
    });
  }

  saveContent() {
    if (!this.editedContent || !this.editedContent._id) return;

    const contentData = {
      contentType: this.editedContent.contentType,
      tagName: this.editedContent.tagName,
      contentFields: this.editedContent.contentFields.map((field: any) => ({
        fieldName: field.fieldName,
        fieldValue: field.fieldValue || "",
        fieldType: field.fieldType || "string"
      }))
    };

    this.apiService.updateContent(this.editedContent._id, contentData).subscribe({
      next: (response) => {
        console.log('Content updated successfully:', response);
        this.router.navigate(['/content']);
      },
      error: (error) => {
        console.error('Error updating content:', error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/content']);
  }
} 