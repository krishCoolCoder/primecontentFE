import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-toast-testing',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './toast-testing.component.html',
  styleUrl: './toast-testing.component.css'
})
export class ToastTestingComponent implements OnInit {

  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  // Demo methods for toast notifications
  showSuccessToast() {
    this.toastService.showSuccess('This is a success message!');
  }

  showErrorToast() {
    this.toastService.showError('This is an error message!');
  }

  showWarningToast() {
    this.toastService.showWarning('This is a warning message!');
  }

  showInfoToast() {
    this.toastService.showInfo('This is an info message!');
  }

  showMultipleToasts() {
    this.toastService.showSuccess('First toast message');
    setTimeout(() => this.toastService.showWarning('Second toast message'), 500);
    setTimeout(() => this.toastService.showError('Third toast message'), 1000);
  }

  showCustomDurationToast() {
    this.toastService.showInfo('This message will disappear in 2 seconds', 2000);
  }

  showLongToast() {
    this.toastService.showWarning('This is a longer message that will stay for 10 seconds to test the layout and responsiveness of the toast component', 10000);
  }

  showPermanentToast() {
    this.toastService.showError('This toast will not auto-dismiss (duration = 0)', 0);
  }

  clearAllToasts() {
    this.toastService.clearAllToasts();
  }
} 