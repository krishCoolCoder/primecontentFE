import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-tag-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-tag-modal.component.html',
  styleUrl: './delete-tag-modal.component.css'
})
export class DeleteTagModalComponent {
  @Input() tagName: string = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  onConfirmDelete() {
    this.confirmDelete.emit();
  }

  onCancelDelete() {
    this.cancelDelete.emit();
  }
} 