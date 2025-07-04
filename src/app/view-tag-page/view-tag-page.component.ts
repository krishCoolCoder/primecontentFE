import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-tag-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './view-tag-page.component.html',
  styleUrl: './view-tag-page.component.css'
})
export class ViewTagPageComponent implements OnInit {
  tag: any = null;
  tagId: string = '';

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
    }
  }

  goBack() {
    this.router.navigate(['/tag']);
  }

  editTag() {
    this.router.navigate(['/editTag', this.tagId]);
  }
} 