import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterModalComponent, ContentFilter } from '../modals/filter-modal/filter-modal.component';
import { ApiService } from '../services/api.service';
import { Content } from '../models/content.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, NgIf, FilterModalComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedContent: Content | null = null;
  contentList: Content[] = [];
  currentFilters: ContentFilter | null = null;
  
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
  
  ngOnInit() {
    this.loadContents();
  }

  loadContents(filters?: ContentFilter) {
    const apiFilters = filters ? {
      contentType: filters.contentType || undefined,
      fromDate: filters.fromDate || undefined,
      toDate: filters.toDate || undefined
    } : undefined;

    this.apiService.getAllContentsDataWithFilters(apiFilters).subscribe({
      next: (response) => {
        console.log('Contents loaded:', response);
        this.contentList = response.reverse(); // Reverse to show recent contents first
      },
      error: (error) => {
        console.error('Error loading contents:', error);
      }
    });
  }
  
  redirectToCreateContent() {
    this.router.navigate(["/createContent"]);
  }
  
  setGridView() {
    this.listView = false;
    this.gridView = true;
  }
  
  setListView() {
    this.listView = true;
    this.gridView = false;
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  onApplyFilter(filters: ContentFilter) {
    console.log('Applying filters:', filters);
    this.currentFilters = filters;
    this.loadContents(filters);
  }

  viewContent(content: Content) {
    console.log('View content clicked:', content);
    if (content._id) {
      this.router.navigate(['/viewContent', content._id]);
    }
  }

  editContent(content: Content) {
    console.log('Edit content clicked:', content);
    if (content._id) {
      this.router.navigate(['/editContent', content._id]);
    }
  }

  deleteContent(content: Content) {
    this.selectedContent = content;
    this.isDeleteModalOpen = true;
  }

  onConfirmDelete() {
    if (this.selectedContent && this.selectedContent._id) {
      this.apiService.deleteContent(this.selectedContent._id).subscribe({
        next: (response) => {
          console.log('Content deleted:', response);
          this.loadContents(this.currentFilters || undefined); // Refresh the list with current filters
          this.selectedContent = null;
          this.isDeleteModalOpen = false;
        },
        error: (error) => {
          console.error('Error deleting content:', error);
          this.isDeleteModalOpen = false;
        }
      });
    }
  }

  onCancelDelete() {
    this.selectedContent = null;
    this.isDeleteModalOpen = false;
  }
}
