import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';
import { DeleteTagModalComponent } from '../modals/delete-tag-modal/delete-tag-modal.component';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.tags = JSON.parse(localStorage.getItem('tags') ?? '[]');
  }

  redirectToCreateTagPage() {
    this.router.navigate(['/createTagPage']);
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

  viewTag(tag: any) {
    console.log('View tag clicked:', tag);
    // Create a unique identifier using tag name and description
    const uniqueId = this.createUniqueId(tag);
    console.log('Navigating to viewTag with ID:', uniqueId);
    this.router.navigate(['/viewTag', uniqueId]);
  }

  editTag(tag: any) {
    console.log('Edit tag clicked:', tag);
    // Create a unique identifier using tag name and description
    const uniqueId = this.createUniqueId(tag);
    console.log('Navigating to editTag with ID:', uniqueId);
    this.router.navigate(['/editTag', uniqueId]);
  }

  deleteTag(tag: any) {
    console.log('Delete tag clicked:', tag);
    this.selectedTag = tag;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteTagModal'));
    modal.show();
  }

  private createUniqueId(tag: any): string {
    // Create a unique identifier based on tag name and description
    return `${tag.tagName}-${tag.description || ''}`;
  }

  onConfirmDelete() {
    console.log('Confirm delete clicked for:', this.selectedTag);
    if (this.selectedTag) {
      const tagsList = JSON.parse(localStorage.getItem('tags') ?? '[]');
      console.log('Current tags list:', tagsList);
      console.log('Tag to delete:', this.selectedTag);
      
      // Remove the selected tag by comparing tag name and description
      const updatedList = tagsList.filter((item: any) => {
        console.log('Comparing item:', item);
        console.log('Selected tag:', this.selectedTag);
        
        if (item.tagName !== this.selectedTag.tagName) {
          console.log('Tag name mismatch');
          return true;
        }
        if (item.description !== this.selectedTag.description) {
          console.log('Description mismatch');
          return true;
        }
        console.log('Found matching tag to delete');
        return false; // This is the item to delete
      });
      
      console.log('Updated list:', updatedList);
      localStorage.setItem('tags', JSON.stringify(updatedList));
      this.tags = updatedList;
      this.selectedTag = null;
      
      // Hide the modal
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteTagModal'));
      if (modal) {
        modal.hide();
      }
      
      console.log('Tag deleted successfully');
    } else {
      console.log('No selected tag to delete');
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
}
