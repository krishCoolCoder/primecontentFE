import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { DeleteConfirmationModalComponent } from '../modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, DeleteConfirmationModalComponent, FilterModalComponent],
  templateUrl: './content-type-page.component.html',
  styleUrl: './content-type-page.component.css'
})
export class ContentTypePageComponent implements OnInit {
  contentTypeList: any[] = [];
  selectedContentType: any = null;
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadContentTypes();
  }

  loadContentTypes() {
    this.apiService.getAllContentTypesData().subscribe({
      next: (response) => {
        console.log('Content types loaded:', response);
        this.contentTypeList = response;
      },
      error: (error) => {
        console.error('Error loading content types:', error);
      }
    });
  }

  redirectToCreateContentType() {
    this.router.navigate(['/createContentType']);
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

  viewContentType(contentType: any) {
    this.router.navigate(['/viewContentType', contentType._id]);
  }

  editContentType(contentType: any) {
    this.router.navigate(['/editContentType', contentType._id]);
  }

  deleteContentType(contentType: any) {
    this.selectedContentType = contentType;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
  }

  onConfirmDelete() {
    if (this.selectedContentType) {
      this.apiService.deleteContentType(this.selectedContentType._id).subscribe({
        next: (response) => {
          console.log('Content type deleted successfully:', response);
          this.loadContentTypes(); // Refresh the list
          this.selectedContentType = null;
        },
        error: (error) => {
          console.error('Error deleting content type:', error);
          this.selectedContentType = null;
        }
      });
    }
  }

  onCancelDelete() {
    this.selectedContentType = null;
  }
}
