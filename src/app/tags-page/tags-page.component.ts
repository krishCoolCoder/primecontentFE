import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent, TagFilter } from '../modals/filter-modal/filter-modal.component';
import { DeleteTagModalComponent } from '../modals/delete-tag-modal/delete-tag-modal.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent, DeleteTagModalComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.css'
})
export class TagsPageComponent implements OnInit {
  tags: any[] = [];
  isFilterOpen: boolean = false;
  listView: boolean = true;
  gridView: boolean = false;
  selectedTag: any = null;
  currentFilters: TagFilter | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags(filters?: TagFilter) {
    const apiFilters = filters ? {
      tagName: filters.tagName || undefined,
      fromDate: filters.fromDate || undefined,
      toDate: filters.toDate || undefined
    } : undefined;

    this.apiService.getAllTagsDataWithFilters(apiFilters).subscribe({
      next: (response) => {
        console.log('Tags loaded:', response);
        this.tags = response.reverse(); // Reverse to show recent tags first
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }

  redirectToCreateTagPage() {
    this.router.navigate(['/createTagPage']);
  }

  setListView() {
    this.listView = true;
    this.gridView = false;
  }

  setGridView() {
    this.listView = false;
    this.gridView = true;
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }

  viewTag(tag: any) {
    console.log('View tag clicked:', tag);
    this.router.navigate(['/viewTag', tag._id]);
  }

  editTag(tag: any) {
    console.log('Edit tag clicked:', tag);
    this.router.navigate(['/editTag', tag._id]);
  }

  deleteTag(tag: any) {
    console.log('Delete tag clicked:', tag);
    this.selectedTag = tag;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteTagModal'));
    modal.show();
  }

  onConfirmDelete() {
    console.log('Confirm delete clicked for:', this.selectedTag);
    if (this.selectedTag) {
      this.apiService.deleteTag(this.selectedTag._id).subscribe({
        next: (response) => {
          console.log('Tag deleted successfully:', response);
          
          // Hide the modal
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteTagModal'));
          if (modal) {
            modal.hide();
          }
          
          // Reload tags list with current filters
          this.loadTags(this.currentFilters || undefined);
          this.selectedTag = null;
        },
        error: (error) => {
          console.error('Error deleting tag:', error);
          alert('Error deleting tag. Please try again.');
        }
      });
    }
  }

  onCancelDelete() {
    console.log('Cancel delete clicked');
    this.selectedTag = null;
    // Hide the modal
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteTagModal'));
    if (modal) {
      modal.hide();
    }
  }

  onApplyFilter(filters: TagFilter) {
    console.log('Applying filters:', filters);
    this.currentFilters = filters;
    this.loadTags(filters);
    this.closeFilter();
  }
}
