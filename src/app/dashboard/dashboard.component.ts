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
  @ViewChild('barChart') lineChartForContent!: ElementRef;
  @ViewChild('contentTypeChart') lineChartForContentTypeChart!: ElementRef;

  ngAfterViewInit() {
    const ctx = this.lineChartForContent.nativeElement.getContext('2d');
    const contentTypeCtx = this.lineChartForContentTypeChart.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Content created',
          data: [20, 40, 80, 20, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(60, 60, 60)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart(contentTypeCtx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Content Type created',
          data: [20, 40, 80, 20, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(60, 60, 60)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'rgb(60, 60, 60)',
  //           'rgb(60, 60, 60)',
  //           'rgb(60, 60, 60)',
  //           'rgb(60, 60, 60)',
  //           'rgb(60, 60, 60)',
  //           'rgb(60, 60, 60)'
  //         ],
  //         borderColor: 'rgba(0,0,0,0.1)',
  //         borderWidth: 0
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
}