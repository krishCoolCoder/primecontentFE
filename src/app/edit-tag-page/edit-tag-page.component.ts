import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-tag-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './edit-tag-page.component.html',
  styleUrl: './edit-tag-page.component.css'
})
export class EditTagPageComponent implements OnInit {
  tag: any = null;
  editedTag: any = null;
  tagId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tagId = params['id'];
      this.loadTag();
    });
  }

  loadTag() {
    this.apiService.getTagByIdData(this.tagId).subscribe({
      next: (response) => {
        console.log('Tag loaded:', response);
        this.tag = response;
        
        // Create a copy for editing
        this.editedTag = {
          ...this.tag
        };
      },
      error: (error) => {
        console.error('Error loading tag:', error);
        this.router.navigate(['/tag']);
      }
    });
  }

  saveTag() {
    if (!this.editedTag) return;

    const tagData = {
      tagName: this.editedTag.tagName,
      description: this.editedTag.description
    };

    this.apiService.updateTag(this.tagId, tagData).subscribe({
      next: (response) => {
        console.log('Tag updated successfully:', response);
        this.router.navigate(['/tag']);
      },
      error: (error) => {
        console.error('Error updating tag:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/tag']);
  }
} 