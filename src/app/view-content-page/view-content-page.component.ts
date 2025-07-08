import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Content } from '../models/content.model';

@Component({
  selector: 'app-view-content-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './view-content-page.component.html',
  styleUrl: './view-content-page.component.css'
})
export class ViewContentPageComponent implements OnInit {
  content: Content | null = null;
  contentId: string = '';

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
        console.log('Content loaded for view:', response);
        this.content = response;
      },
      error: (error) => {
        console.error('Error loading content:', error);
        this.router.navigate(['/content']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/content']);
  }

  editContent() {
    this.router.navigate(['/editContent', this.contentId]);
  }
} 