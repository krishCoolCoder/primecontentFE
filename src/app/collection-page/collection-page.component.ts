import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';
import { DeleteConfirmationModalComponent } from '../modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { ApiService } from '../services/api.service';
import { Collection } from '../models/collection.model';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent, DeleteConfirmationModalComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent implements OnInit {
  collectionList: Collection[] = [];
  isFilterOpen: boolean = false;
  listView: boolean = true;
  gridView: boolean = false;
  loading: boolean = false;
  error: string | null = null;
  
  // Delete confirmation modal state
  selectedCollection: Collection | null = null;
  showDeleteModal: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getAllCollectionsData().subscribe({
      next: (collections) => {
        this.collectionList = collections;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading collections:', error);
        this.error = 'Failed to load collections. Please try again.';
        this.loading = false;
      }
    });
  }

  redirectToCreateCollection() {
    this.router.navigate(['/createCollection']);
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

  // View collection details
  viewCollection(collection: Collection) {
    if (collection._id) {
      // Navigate to view collection page with collection ID
      this.router.navigate(['/viewCollection', collection._id]);
    }
  }

  // Edit collection
  editCollection(collection: Collection) {
    if (collection._id) {
      // Navigate to edit page with collection ID
      this.router.navigate(['/editCollection', collection._id]);
    }
  }

  // Show delete confirmation modal
  confirmDeleteCollection(collection: Collection) {
    this.selectedCollection = collection;
    this.showDeleteModal = true;
  }

  // Delete collection
  deleteCollection() {
    if (this.selectedCollection && this.selectedCollection._id) {
      this.apiService.deleteCollection(this.selectedCollection._id).subscribe({
        next: (response) => {
          console.log('Collection deleted:', response);
          this.loadCollections(); // Refresh the list
          this.cancelDelete();
        },
        error: (error) => {
          console.error('Error deleting collection:', error);
          this.error = 'Failed to delete collection. Please try again.';
        }
      });
    }
  }

  // Cancel delete
  cancelDelete() {
    this.selectedCollection = null;
    this.showDeleteModal = false;
  }

  // Helper method to get content type name
  getContentTypeName(collection: Collection): string {
    if (typeof collection.contentTypeId === 'object' && collection.contentTypeId !== null) {
      return collection.contentTypeId.contentTypeName;
    }
    return collection.contentType || 'Unknown';
  }

  // Helper method to get content type ID
  getContentTypeId(collection: Collection): string {
    if (typeof collection.contentTypeId === 'object' && collection.contentTypeId !== null) {
      return collection.contentTypeId._id;
    }
    return collection.contentTypeId as string;
  }

  // Copy URL to clipboard
  copyUrl(collection: Collection) {
    if (collection.api) {
      navigator.clipboard.writeText(collection.api).then(() => {
        console.log('URL copied to clipboard');
        // You can add a toast notification here if needed
      }).catch(err => {
        console.error('Failed to copy URL: ', err);
      });
    }
  }

  // Copy cURL command to clipboard
  copyCurl(collection: Collection) {
    if (collection.api) {
      const token = localStorage.getItem('token');
      const curlCommand = `curl -X GET "${collection.api}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token || 'YOUR_TOKEN_HERE'}"`;
      
      navigator.clipboard.writeText(curlCommand).then(() => {
        console.log('cURL command copied to clipboard');
        // You can add a toast notification here if needed
      }).catch(err => {
        console.error('Failed to copy cURL command: ', err);
      });
    }
  }
}
