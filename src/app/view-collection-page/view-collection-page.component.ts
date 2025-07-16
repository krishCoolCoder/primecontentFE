import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Collection } from '../models/collection.model';

@Component({
  selector: 'app-view-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './view-collection-page.component.html',
  styleUrl: './view-collection-page.component.css'
})
export class ViewCollectionPageComponent implements OnInit {
  collection: Collection | null = null;
  collectionId: string = '';
  collectionContents: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  contentsLoading: boolean = false;
  contentsError: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.collectionId = params['id'];
      this.loadCollection();
    });
  }

  loadCollection() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getCollectionByIdData(this.collectionId).subscribe({
      next: (response) => {
        console.log('Collection loaded for view:', response);
        this.collection = response;
        this.loading = false;
        
        // Load collection contents after collection is loaded
        this.loadCollectionContents();
      },
      error: (error) => {
        console.error('Error loading collection:', error);
        this.error = 'Failed to load collection. Please try again.';
        this.loading = false;
      }
    });
  }

  loadCollectionContents() {
    if (!this.collection?.collectionName) {
      return;
    }
    
    this.contentsLoading = true;
    this.contentsError = null;
    
    // Extract filters from the collection's API URL if any
    const filters: { [key: string]: string } = {};
    
    this.apiService.getCollectionContentsData(this.collection.collectionName, filters).subscribe({
      next: (contents) => {
        console.log('Collection contents loaded:', contents);
        this.collectionContents = contents;
        this.contentsLoading = false;
      },
      error: (error) => {
        console.error('Error loading collection contents:', error);
        this.contentsError = 'Failed to load collection contents.';
        this.contentsLoading = false;
      }
    });
  }

  getContentTypeName(): string {
    if (!this.collection) return 'Unknown';
    
    if (typeof this.collection.contentTypeId === 'object' && this.collection.contentTypeId !== null) {
      return this.collection.contentTypeId.contentTypeName || 'Unknown';
    }
    return 'Unknown';
  }

  goBack() {
    this.router.navigate(['/collection']);
  }

  editCollection() {
    if (this.collection?._id) {
      this.router.navigate(['/editCollection', this.collection._id]);
    }
  }

  retryLoadContents() {
    this.loadCollectionContents();
  }
} 