import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private toasts: Toast[] = [];

  constructor() {}

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000) {
    const id = this.generateId();
    const toast: Toast = {
      id,
      message,
      type,
      duration
    };

    this.toasts.push(toast);
    this.toastsSubject.next([...this.toasts]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }

  clearAllToasts() {
    this.toasts = [];
    this.toastsSubject.next([]);
  }

  // Convenience methods for different toast types
  showSuccess(message: string, duration?: number) {
    this.showToast(message, 'success', duration);
  }

  showError(message: string, duration?: number) {
    this.showToast(message, 'error', duration);
  }

  showWarning(message: string, duration?: number) {
    this.showToast(message, 'warning', duration);
  }

  showInfo(message: string, duration?: number) {
    this.showToast(message, 'info', duration);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 