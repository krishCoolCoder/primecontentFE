import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-content-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-content-modal.component.html',
  styleUrl: './delete-content-modal.component.css'
})
export class DeleteContentModalComponent {
  @Input() contentName: string = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  onConfirmDelete() {
    this.confirmDelete.emit();
  }

  onCancelDelete() {
    this.cancelDelete.emit();
  }
} 