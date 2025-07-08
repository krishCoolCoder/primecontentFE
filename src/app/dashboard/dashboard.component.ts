import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('contentChart') contentChart!: ElementRef;
  @ViewChild('contentTypeChart') contentTypeChart!: ElementRef;
  @ViewChild('tagsChart') tagsChart!: ElementRef;
  @ViewChild('usersChart') usersChart!: ElementRef;

  // Counts
  contentCount: number = 0;
  contentTypeCount: number = 0;
  tagsCount: number = 0;
  usersCount: number = 0;

  constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    this.loadCounts();
  }

  loadCounts() {
    // Load contents count
    this.apiService.getContentsCountData().subscribe({
      next: (count) => {
        this.contentCount = count;
        this.updateContentChart();
      },
      error: (error) => {
        console.error('Error loading contents count:', error);
        this.contentCount = 0;
        this.updateContentChart();
      }
    });

    // Load content types count
    this.apiService.getContentTypesCountData().subscribe({
      next: (count) => {
        this.contentTypeCount = count;
        this.updateContentTypeChart();
      },
      error: (error) => {
        console.error('Error loading content types count:', error);
        this.contentTypeCount = 0;
        this.updateContentTypeChart();
      }
    });

    // Load tags count
    this.apiService.getTagsCountData().subscribe({
      next: (count) => {
        this.tagsCount = count;
        this.updateTagsChart();
      },
      error: (error) => {
        console.error('Error loading tags count:', error);
        this.tagsCount = 0;
        this.updateTagsChart();
      }
    });

    // Load users count
    this.apiService.getUsersCountData().subscribe({
      next: (count) => {
        this.usersCount = count;
        this.updateUsersChart();
      },
      error: (error) => {
        console.error('Error loading users count:', error);
        this.usersCount = 0;
        this.updateUsersChart();
      }
    });
  }

  updateContentChart() {
    const contentCtx = this.contentChart.nativeElement.getContext('2d');
    new Chart(contentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Content'],
        datasets: [{
          data: [this.contentCount || 1],
          backgroundColor: ['#4CAF50'],
          borderColor: ['#45a049'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Content: ${context.parsed}`;
              }
            }
          }
        }
      }
    });
  }

  updateContentTypeChart() {
    const contentTypeCtx = this.contentTypeChart.nativeElement.getContext('2d');
    new Chart(contentTypeCtx, {
      type: 'doughnut',
      data: {
        labels: ['Content Types'],
        datasets: [{
          data: [this.contentTypeCount || 1],
          backgroundColor: ['#2196F3'],
          borderColor: ['#1976D2'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Content Types: ${context.parsed}`;
              }
            }
          }
        }
      }
    });
  }

  updateTagsChart() {
    const tagsCtx = this.tagsChart.nativeElement.getContext('2d');
    new Chart(tagsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Tags'],
        datasets: [{
          data: [this.tagsCount || 1],
          backgroundColor: ['#FF9800'],
          borderColor: ['#F57C00'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Tags: ${context.parsed}`;
              }
            }
          }
        }
      }
    });
  }

  updateUsersChart() {
    const usersCtx = this.usersChart.nativeElement.getContext('2d');
    new Chart(usersCtx, {
      type: 'doughnut',
      data: {
        labels: ['Users'],
        datasets: [{
          data: [this.usersCount || 1],
          backgroundColor: ['#9C27B0'],
          borderColor: ['#7B1FA2'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Users: ${context.parsed}`;
              }
            }
          }
        }
      }
    });
  }

  getContentCount(): number {
    return this.contentCount;
  }

  getContentTypeCount(): number {
    return this.contentTypeCount;
  }

  getTagsCount(): number {
    return this.tagsCount;
  }

  getUsersCount(): number {
    return this.usersCount;
  }
}