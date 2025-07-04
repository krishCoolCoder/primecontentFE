import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tag-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './edit-tag-page.component.html',
  styleUrl: './edit-tag-page.component.css'
})
export class EditTagPageComponent implements OnInit {
  tag: any = null;
  tagId: string = '';
  editedTag: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tagId = params['id'];
      this.loadTag();
    });
  }

  loadTag() {
    const tagsList = JSON.parse(localStorage.getItem('tags') ?? '[]');
    
    // First try to find by ID
    this.tag = tagsList.find((item: any) => item.id === this.tagId);
    
    // If not found by ID, try to find by tag name
    if (!this.tag) {
      this.tag = tagsList.find((item: any) => item.tagName === this.tagId);
    }
    
    // If still not found, try to find by unique identifier (tag name + description)
    if (!this.tag) {
      this.tag = tagsList.find((item: any) => {
        const uniqueId = `${item.tagName}-${item.description || ''}`;
        return uniqueId === this.tagId;
      });
    }
    
    if (!this.tag) {
      this.router.navigate(['/tag']);
      return;
    }

    // Create a copy for editing
    this.editedTag = {
      ...this.tag
    };
  }

  saveTag() {
    if (!this.editedTag) return;

    const tagsList = JSON.parse(localStorage.getItem('tags') ?? '[]');
    
    // Find the tag to update using the same logic as loadTag
    let index = tagsList.findIndex((item: any) => item.id === this.tagId);
    
    // If not found by ID, try to find by tag name
    if (index === -1) {
      index = tagsList.findIndex((item: any) => item.tagName === this.tagId);
    }
    
    // If still not found, try to find by unique identifier
    if (index === -1) {
      index = tagsList.findIndex((item: any) => {
        const uniqueId = `${item.tagName}-${item.description || ''}`;
        return uniqueId === this.tagId;
      });
    }
    
    if (index !== -1) {
      tagsList[index] = this.editedTag;
      localStorage.setItem('tags', JSON.stringify(tagsList));
      this.router.navigate(['/tag']);
    }
  }

  cancel() {
    this.router.navigate(['/tag']);
  }
} 