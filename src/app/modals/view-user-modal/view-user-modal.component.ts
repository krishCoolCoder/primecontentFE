import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-view-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user-modal.component.html',
  styleUrl: './view-user-modal.component.css'
})
export class ViewUserModalComponent {
  @Input() user: User | null = null;
} 