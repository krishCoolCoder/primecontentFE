import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';
import { DeleteContentModalComponent } from '../modals/delete-content-modal/delete-content-modal.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, NgIf, FilterModalComponent, DeleteContentModalComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;
  selectedContent: any = null;
  
  constructor(private router: Router){}
  
  contentList : any;
  
  ngOnInit(){
    this.contentList = JSON.parse(localStorage.getItem("content") ?? "[]");
    console.log("The contentList data is this : ", this.contentList)
  }
  
  redirectToCreateContent(){
    this.router.navigate(["/createContent"])
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

  viewContent(content: any) {
    console.log('View content clicked:', content);
    // Create a unique identifier using content type and field values
    const uniqueId = this.createUniqueId(content);
    console.log('Navigating to viewContent with ID:', uniqueId);
    this.router.navigate(['/viewContent', uniqueId]);
  }

  editContent(content: any) {
    console.log('Edit content clicked:', content);
    // Create a unique identifier using content type and field values
    const uniqueId = this.createUniqueId(content);
    console.log('Navigating to editContent with ID:', uniqueId);
    this.router.navigate(['/editContent', uniqueId]);
  }

  private createUniqueId(content: any): string {
    // Create a unique identifier based on content type and field values
    const fieldValues = content.contentFields.map((field: any) => `${field.fieldName}:${field.fieldValue}`).join('|');
    return `${content.contentType}-${fieldValues}`;
  }

  deleteContent(content: any) {
    console.log('Delete content clicked:', content);
    this.selectedContent = content;
    // Trigger Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteContentModal'));
    modal.show();
  }

  onConfirmDelete() {
    console.log('Confirm delete clicked for:', this.selectedContent);
    if (this.selectedContent) {
      const contentList = JSON.parse(localStorage.getItem('content') ?? '[]');
      console.log('Current content list:', contentList);
      console.log('Content to delete:', this.selectedContent);
      
      // Remove the selected content by comparing content type and fields
      const updatedList = contentList.filter((item: any) => {
        console.log('Comparing item:', item);
        console.log('Selected content:', this.selectedContent);
        
        if (item.contentType !== this.selectedContent.contentType) {
          console.log('Content type mismatch');
          return true;
        }
        if (item.contentFields.length !== this.selectedContent.contentFields.length) {
          console.log('Content fields length mismatch');
          return true;
        }
        
        // Compare each field
        for (let i = 0; i < item.contentFields.length; i++) {
          if (item.contentFields[i].fieldName !== this.selectedContent.contentFields[i].fieldName ||
              item.contentFields[i].fieldValue !== this.selectedContent.contentFields[i].fieldValue) {
            console.log('Field mismatch at index', i);
            return true;
          }
        }
        console.log('Found matching item to delete');
        return false; // This is the item to delete
      });
      
      console.log('Updated list:', updatedList);
      localStorage.setItem('content', JSON.stringify(updatedList));
      this.contentList = updatedList;
      this.selectedContent = null;
      
      // Hide the modal
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('deleteContentModal'));
      if (modal) {
        modal.hide();
      }
      
      console.log('Content deleted successfully');
    } else {
      console.log('No selected content to delete');
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
