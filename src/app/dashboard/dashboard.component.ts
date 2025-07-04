import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

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

  ngAfterViewInit() {
    this.createCharts();
  }

  createCharts() {
    // Get counts from localStorage
    const contentCount = this.getContentCount();
    const contentTypeCount = this.getContentTypeCount();
    const tagsCount = this.getTagsCount();
    const usersCount = this.getUsersCount();

    // Content Chart
    const contentCtx = this.contentChart.nativeElement.getContext('2d');
    new Chart(contentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Content'],
        datasets: [{
          data: [contentCount],
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

    // Content Type Chart
    const contentTypeCtx = this.contentTypeChart.nativeElement.getContext('2d');
    new Chart(contentTypeCtx, {
      type: 'doughnut',
      data: {
        labels: ['Content Types'],
        datasets: [{
          data: [contentTypeCount],
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

    // Tags Chart
    const tagsCtx = this.tagsChart.nativeElement.getContext('2d');
    new Chart(tagsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Tags'],
        datasets: [{
          data: [tagsCount],
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

    // Users Chart
    const usersCtx = this.usersChart.nativeElement.getContext('2d');
    new Chart(usersCtx, {
      type: 'doughnut',
      data: {
        labels: ['Users'],
        datasets: [{
          data: [usersCount],
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
    const content = JSON.parse(localStorage.getItem('content') || '[]');
    return content.length;
  }

  getContentTypeCount(): number {
    const contentTypes = JSON.parse(localStorage.getItem('contentTypeList') || '[]');
    return contentTypes.length;
  }

  getTagsCount(): number {
    const tags = JSON.parse(localStorage.getItem('tags') || '[]');
    return tags.length;
  }

  getUsersCount(): number {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.length;
  }
}