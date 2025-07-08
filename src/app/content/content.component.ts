import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';
import { DeleteContentModalComponent } from '../modals/delete-content-modal/delete-content-modal.component';
import { ApiService } from '../services/api.service';
import { Content } from '../models/content.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, NgIf, FilterModalComponent, DeleteContentModalComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;
  selectedContent: Content | null = null;
  contentList: Content[] = [];
  
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
  
  ngOnInit() {
    this.loadContents();
  }

  loadContents() {
    this.apiService.getAllContentsData().subscribe({
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

  viewContent(content: Content) {
    console.log('View content clicked:', content);
    this.router.navigate(['/viewContent', content._id]);
  }

  editContent(content: Content) {
    console.log('Edit content clicked:', content);
    this.router.navigate(['/editContent', content._id]);
  }

  deleteContent(content: Content) {
    console.log('Delete content clicked:', content);
    this.selectedContent = content;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteContentModal'));
    modal.show();
  }

  onConfirmDelete() {
    console.log('Confirm delete clicked for:', this.selectedContent);
    if (this.selectedContent && this.selectedContent._id) {
      this.apiService.deleteContent(this.selectedContent._id).subscribe({
        next: (response) => {
          console.log('Content deleted successfully:', response);
          
          // Hide the modal
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteContentModal'));
          if (modal) {
            modal.hide();
          }
          
          // Reload contents list
          this.loadContents();
          this.selectedContent = null;
        },
        error: (error) => {
          console.error('Error deleting content:', error);
        }
      });
    }
  }

  onCancelDelete() {
    console.log('Cancel delete clicked');
    this.selectedContent = null;
    // Hide the modal
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteContentModal'));
    if (modal) {
      modal.hide();
    }
  }
}
