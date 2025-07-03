import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentTypeService } from '../services/content-type.service';
import { ContentType } from '../models/content-type.model';

@Component({
  selector: 'app-view-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './view-content-type-page.component.html',
  styleUrl: './view-content-type-page.component.css'
})
export class ViewContentTypePageComponent implements OnInit {
  contentType: ContentType | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentTypeService: ContentTypeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.contentType = this.contentTypeService.getContentTypeById(params['id']) || null;
        if (!this.contentType) {
          this.router.navigate(['/contentType']);
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/contentType']);
  }

  editContentType() {
    if (this.contentType) {
      this.router.navigate(['/editContentType', this.contentType.id]);
    }
  }
} 