import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

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
      },
      error: (error) => {
        console.error('Error loading tag:', error);
        this.router.navigate(['/tag']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/tag']);
  }

  editTag() {
    this.router.navigate(['/editTag', this.tagId]);
  }
} 