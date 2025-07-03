import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { ContentTypeService } from '../services/content-type.service';
import { ContentType } from '../models/content-type.model';
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
  contentTypeList: ContentType[] = [];
  selectedContentType: ContentType | null = null;
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;

  constructor(
    private router: Router,
    private contentTypeService: ContentTypeService
  ) {}

  ngOnInit() {
    this.loadContentTypes();
  }

  loadContentTypes() {
    this.contentTypeList = this.contentTypeService.getContentTypes();
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

  viewContentType(contentType: ContentType) {
    this.router.navigate(['/viewContentType', contentType.id]);
  }

  editContentType(contentType: ContentType) {
    this.router.navigate(['/editContentType', contentType.id]);
  }

  deleteContentType(contentType: ContentType) {
    this.selectedContentType = contentType;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
  }

  onConfirmDelete() {
    if (this.selectedContentType) {
      this.contentTypeService.deleteContentType(this.selectedContentType.id);
      this.loadContentTypes();
      this.selectedContentType = null;
    }
  }

  onCancelDelete() {
    this.selectedContentType = null;
  }
}
