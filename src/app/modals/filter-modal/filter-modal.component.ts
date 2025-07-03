import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeFilter = new EventEmitter<void>();
  
  titleFilter: string = '';
  fieldFilter: string = '';

  onClose() {
    this.closeFilter.emit();
  }

  onApplyFilter() {
    // Filter functionality will be implemented later
    console.log('Title Filter:', this.titleFilter);
    console.log('Field Filter:', this.fieldFilter);
    this.onClose();
  }

  onClearFilter() {
    this.titleFilter = '';
    this.fieldFilter = '';
  }
} 