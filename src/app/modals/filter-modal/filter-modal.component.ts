import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

export interface ContentFilter {
  contentType: string;
  fromDate: string;
  toDate: string;
}

export interface TagFilter {
  tagName: string;
  fromDate: string;
  toDate: string;
}

export interface CollectionFilter {
  collectionName: string;
  fromDate: string;
  toDate: string;
}

export interface UserFilter {
  userRole: string;
  userName: string;
  email: string;
  fromDate: string;
  toDate: string;
}

export interface UserRoleFilter {
  roleName: string;
  fromDate: string;
  toDate: string;
  tag: string;
}

export interface FilterConfig {
  pageType: 'content' | 'contentType' | 'collection' | 'tag' | 'userRole' | 'user';
  filters?: ContentFilter | TagFilter | CollectionFilter | UserFilter | UserRoleFilter;
}

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() pageType: 'content' | 'contentType' | 'collection' | 'tag' | 'userRole' | 'user' = 'content';
  @Output() closeFilter = new EventEmitter<void>();
  @Output() applyFilter = new EventEmitter<any>();
  
  // Content page filters
  contentType: string = '';
  fromDate: string = '';
  toDate: string = '';
  
  // Tag page filters
  tagName: string = '';
  
  // Collection page filters
  collectionName: string = '';
  
  // User page filters
  userRole: string = '';
  userName: string = '';
  email: string = '';
  
  // User role page filters
  roleName: string = '';
  tag: string = '';
  
  // Content types for dropdown
  contentTypes: any[] = [];
  
  // User roles for dropdown
  userRoles: any[] = [];
  
  // Tags for dropdown
  tags: any[] = [];
  
  // Date validation error
  dateError: string = '';
  
  // Generic filters for other pages
  titleFilter: string = '';
  fieldFilter: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadContentTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      // Don't clear filters when modal opens - only load content types if needed
      if (this.pageType === 'content' || this.pageType === 'contentType') {
        this.loadContentTypes();
      } else if (this.pageType === 'user') {
        this.loadUserRoles();
      } else if (this.pageType === 'userRole') {
        this.loadTags();
      }
    }
  }

  loadContentTypes() {
    if (this.pageType === 'content' || this.pageType === 'contentType') {
      this.apiService.getAllContentTypesData().subscribe({
        next: (contentTypes) => {
          this.contentTypes = contentTypes;
        },
        error: (error) => {
          console.error('Error loading content types:', error);
        }
      });
    }
  }

  loadUserRoles() {
    if (this.pageType === 'user') {
      this.apiService.getAllUserRolesData().subscribe({
        next: (userRoles) => {
          this.userRoles = userRoles;
        },
        error: (error) => {
          console.error('Error loading user roles:', error);
        }
      });
    }
  }

  loadTags() {
    if (this.pageType === 'userRole') {
      this.apiService.getAllTagsData().subscribe({
        next: (tags) => {
          this.tags = tags;
        },
        error: (error) => {
          console.error('Error loading tags:', error);
        }
      });
    }
  }

  onClose() {
    this.closeFilter.emit();
  }

  onApplyFilter() {
    if (this.pageType === 'content' || this.pageType === 'contentType') {
      // Validate date range
      if (this.fromDate && this.toDate) {
        const fromDateObj = new Date(this.fromDate);
        const toDateObj = new Date(this.toDate);
        
        if (fromDateObj > toDateObj) {
          this.dateError = 'From date cannot be later than to date';
          return;
        }
      }
      
      const filters: ContentFilter = {
        contentType: this.contentType,
        fromDate: this.fromDate,
        toDate: this.toDate
      };
      
      this.applyFilter.emit(filters);
    } else if (this.pageType === 'tag') {
      // Validate date range for tag filters
      if (this.fromDate && this.toDate) {
        const fromDateObj = new Date(this.fromDate);
        const toDateObj = new Date(this.toDate);
        
        if (fromDateObj > toDateObj) {
          this.dateError = 'From date cannot be later than to date';
          return;
        }
      }
      
      const filters: TagFilter = {
        tagName: this.tagName,
        fromDate: this.fromDate,
        toDate: this.toDate
      };
      
      this.applyFilter.emit(filters);
    } else if (this.pageType === 'collection') {
      // Validate date range for collection filters
      if (this.fromDate && this.toDate) {
        const fromDateObj = new Date(this.fromDate);
        const toDateObj = new Date(this.toDate);
        
        if (fromDateObj > toDateObj) {
          this.dateError = 'From date cannot be later than to date';
          return;
        }
      }
      
      const filters: CollectionFilter = {
        collectionName: this.collectionName,
        fromDate: this.fromDate,
        toDate: this.toDate
      };
      
      this.applyFilter.emit(filters);
    } else if (this.pageType === 'user') {
      // Validate date range for user filters
      if (this.fromDate && this.toDate) {
        const fromDateObj = new Date(this.fromDate);
        const toDateObj = new Date(this.toDate);
        
        if (fromDateObj > toDateObj) {
          this.dateError = 'From date cannot be later than to date';
          return;
        }
      }
      
      const filters: UserFilter = {
        userRole: this.userRole,
        userName: this.userName,
        email: this.email,
        fromDate: this.fromDate,
        toDate: this.toDate
      };
      
      this.applyFilter.emit(filters);
    } else if (this.pageType === 'userRole') {
      // Validate date range for user role filters
      if (this.fromDate && this.toDate) {
        const fromDateObj = new Date(this.fromDate);
        const toDateObj = new Date(this.toDate);
        
        if (fromDateObj > toDateObj) {
          this.dateError = 'From date cannot be later than to date';
          return;
        }
      }
      
      const filters: UserRoleFilter = {
        roleName: this.roleName,
        fromDate: this.fromDate,
        toDate: this.toDate,
        tag: this.tag
      };
      
      this.applyFilter.emit(filters);
    } else {
      // Generic filters for other pages
      const filters = {
        titleFilter: this.titleFilter,
        fieldFilter: this.fieldFilter
      };
      
      this.applyFilter.emit(filters);
    }
    
    // Close modal but don't clear filters
    this.closeFilter.emit();
  }

  onClearFilter() {
    this.clearFilters();
  }

  private clearFilters() {
    // Clear content page filters
    this.contentType = '';
    this.fromDate = '';
    this.toDate = '';
    this.dateError = '';
    
    // Clear tag page filters
    this.tagName = '';
    
    // Clear collection page filters
    this.collectionName = '';
    
    // Clear user page filters
    this.userRole = '';
    this.userName = '';
    this.email = '';
    
    // Clear user role page filters
    this.roleName = '';
    this.tag = '';
    
    // Clear generic filters
    this.titleFilter = '';
    this.fieldFilter = '';
  }

  onDateChange() {
    this.dateError = '';
    
    if (this.fromDate && this.toDate) {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
      
      if (fromDateObj > toDateObj) {
        this.dateError = 'From date cannot be later than to date';
      }
    }
  }

  getPageTitle(): string {
    switch (this.pageType) {
      case 'content':
        return 'Content Filter';
      case 'contentType':
        return 'Content Type Filter';
      case 'collection':
        return 'Collection Filter';
      case 'tag':
        return 'Tag Filter';
      case 'userRole':
        return 'User Role Filter';
      case 'user':
        return 'User Filter';
      default:
        return 'Filter';
    }
  }
} 