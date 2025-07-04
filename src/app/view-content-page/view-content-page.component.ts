import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './view-content-page.component.html',
  styleUrl: './view-content-page.component.css'
})
export class ViewContentPageComponent implements OnInit {
  content: any = null;
  contentId: string = '';

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
    }
  }

  goBack() {
    this.router.navigate(['/content']);
  }

  editContent() {
    this.router.navigate(['/editContent', this.contentId]);
  }
} 