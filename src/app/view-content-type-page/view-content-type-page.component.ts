import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './view-content-type-page.component.html',
  styleUrl: './view-content-type-page.component.css'
})
export class ViewContentTypePageComponent implements OnInit {
  contentType: any = null;
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
        this.contentType = response;
      },
      error: (error: any) => {
        console.error('Error loading content type:', error);
        this.router.navigate(['/contentType']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/contentType']);
  }

  editContentType() {
    if (this.contentType) {
      this.router.navigate(['/editContentType', this.contentType._id]);
    }
  }
} 