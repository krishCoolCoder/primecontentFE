import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  registerables,
  ChartConfiguration
} from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Import ApexCharts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule
} from 'ng-apexcharts';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../services/api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('overviewChart') overviewChart!: ElementRef;
  @ViewChild('contentTypesChart') contentTypesChart!: ElementRef;
  @ViewChild('tagsChart') tagsChart!: ElementRef;
  @ViewChild('usersChart') usersChart!: ElementRef;

  // Chart instances for cleanup
  private chartInstances: Chart[] = [];

  // Dashboard data
  dashboardData = {
    contentCount: 0,
    contentTypeCount: 0,
    tagsCount: 0,
    usersCount: 0,
    contentTypes: [] as any[],
    tags: [] as any[],
    users: [] as any[],
    recentContent: [] as any[]
  };

  // Loading states
  loading = {
    overview: true,
    contentTypes: true,
    tags: true,
    users: true
  };

  // Cached values to prevent ExpressionChangedAfterItHasBeenCheckedError
  private cachedTotalItems: number = 0;
  private cachedContentGrowthPercentage: number = 0;
  private cachedActiveUsersPercentage: number = 0;

  // ApexCharts Treemap Configuration
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        data: []
      }
    ],
    chart: {
      height: 250,
      type: "treemap",
      toolbar: {
        show: true
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "bold"
      },
      formatter: function(text, op) {
        return [text, op.value];
      },
      offsetY: -4
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: "#CD363A"
            },
            {
              from: 0.001,
              to: 6,
              color: "#52B12C"
            }
          ]
        }
      }
    }
  };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    // Use setTimeout to ensure ViewChild elements are available
    setTimeout(() => {
      this.loadDashboardData();
    }, 0);
  }

  ngOnDestroy() {
    // Clean up chart instances
    this.chartInstances.forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  }

  loadDashboardData() {
    this.loadOverviewData();
    this.loadContentTypesData();
    this.loadTagsData();
    this.loadUsersData();
  }

  loadOverviewData() {
    this.loading.overview = true;
    
    // Load all counts in parallel
    Promise.all([
      this.apiService.getContentsCountData().toPromise(),
      this.apiService.getContentTypesCountData().toPromise(),
      this.apiService.getTagsCountData().toPromise(),
      this.apiService.getUsersCountData().toPromise()
    ]).then(([contentCount, contentTypeCount, tagsCount, usersCount]) => {
      this.dashboardData.contentCount = contentCount || 0;
      this.dashboardData.contentTypeCount = contentTypeCount || 0;
      this.dashboardData.tagsCount = tagsCount || 0;
      this.dashboardData.usersCount = usersCount || 0;
      
      // Update cached values
      this.updateCachedValues();
      
      this.loading.overview = false;
      this.cdr.detectChanges();
      
      // Create chart after data is loaded and view is updated
      setTimeout(() => {
        this.createOverviewChart();
      }, 100);
    }).catch(error => {
      console.error('Error loading overview data:', error);
      this.loading.overview = false;
      this.updateCachedValues();
      this.cdr.detectChanges();
      
      setTimeout(() => {
        this.createOverviewChart();
      }, 100);
    });
  }

  loadContentTypesData() {
    this.loading.contentTypes = true;
    
    this.apiService.getAllContentTypesData().subscribe({
      next: (contentTypes) => {
        this.dashboardData.contentTypes = contentTypes || [];
        this.loading.contentTypes = false;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createContentTypesChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error loading content types:', error);
        this.loading.contentTypes = false;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createContentTypesChart();
        }, 100);
      }
    });
  }

  loadTagsData() {
    this.loading.tags = true;
    
    this.apiService.getAllTagsData().subscribe({
      next: (tags) => {
        this.dashboardData.tags = tags || [];
        this.loading.tags = false;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createTagsChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.loading.tags = false;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createTagsChart();
        }, 100);
      }
    });
  }

  loadUsersData() {
    this.loading.users = true;
    
    this.apiService.getUsersWithMapping().subscribe({
      next: (response) => {
        this.dashboardData.users = response.data || [];
        this.updateCachedValues();
        this.loading.users = false;
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createUsersChart();
        }, 100);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading.users = false;
        this.updateCachedValues();
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.createUsersChart();
        }, 100);
      }
    });
  }

  private updateCachedValues() {
    this.cachedTotalItems = this.dashboardData.contentCount + 
                           this.dashboardData.contentTypeCount + 
                           this.dashboardData.tagsCount + 
                           this.dashboardData.usersCount;
    
    // Mock calculation - in real app, you'd compare with previous period
    this.cachedContentGrowthPercentage = Math.round(Math.random() * 20 + 5);
    
    // Mock calculation - in real app, you'd calculate based on user activity
    this.cachedActiveUsersPercentage = Math.round((this.dashboardData.usersCount / Math.max(this.dashboardData.usersCount + 5, 1)) * 100);
    
    // Update treemap data
    this.updateTreemapData();
  }

  private updateTreemapData() {
    const treemapData = [
      {
        x: 'Content',
        y: this.dashboardData.contentCount
      },
      {
        x: 'Content Types',
        y: this.dashboardData.contentTypeCount
      },
      {
        x: 'Tags',
        y: this.dashboardData.tagsCount
      },
      {
        x: 'Users',
        y: this.dashboardData.usersCount
      }
    ];

    // Add content type breakdown if available
    if (this.dashboardData.contentTypes && this.dashboardData.contentTypes.length > 0) {
      this.dashboardData.contentTypes.forEach(ct => {
        treemapData.push({
          x: `CT: ${ct.contentTypeName || 'Unnamed'}`,
          y: ct.contentTypeList?.length || 0
        });
      });
    }

    // Add tag breakdown if available
    if (this.dashboardData.tags && this.dashboardData.tags.length > 0) {
      this.dashboardData.tags.slice(0, 10).forEach(tag => { // Limit to 10 tags
        treemapData.push({
          x: `Tag: ${tag.tagName || 'Unnamed'}`,
          y: 1
        });
      });
    }

    // Update chart options
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          data: treemapData
        }
      ]
    };
  }

  createOverviewChart() {
    if (!this.overviewChart || !this.overviewChart.nativeElement) {
      console.warn('Overview chart element not available');
      return;
    }

    const ctx = this.overviewChart.nativeElement.getContext('2d');
    
    const chartConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Content', 'Content Types', 'Tags', 'Users'],
        datasets: [{
          data: [
            this.dashboardData.contentCount,
            this.dashboardData.contentTypeCount,
            this.dashboardData.tagsCount,
            this.dashboardData.usersCount
          ],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FF9800',
            '#9C27B0'
          ],
          borderColor: [
            '#45a049',
            '#1976D2',
            '#F57C00',
            '#7B1FA2'
          ],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = typeof context.parsed === 'number' ? context.parsed : 0;
                
                // Calculate total safely
                const dataArray = context.dataset.data as number[];
                const total = dataArray.reduce((sum, current) => {
                  const num = typeof current === 'number' ? current : 0;
                  return sum + num;
                }, 0);
                
                if (total === 0) {
                  return `${label}: ${value}`;
                }
                
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);
    this.chartInstances.push(chart);
  }

  createContentTypesChart() {
    if (!this.contentTypesChart || !this.contentTypesChart.nativeElement) {
      console.warn('Content types chart element not available');
      return;
    }

    const ctx = this.contentTypesChart.nativeElement.getContext('2d');
    
    const contentTypeNames = this.dashboardData.contentTypes.map(ct => ct.contentTypeName || 'Unnamed');
    const contentTypeCounts = this.dashboardData.contentTypes.map(ct => ct.contentTypeList?.length || 0);
    
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: contentTypeNames.length > 0 ? contentTypeNames : ['No Content Types'],
        datasets: [{
          label: 'Fields Count',
          data: contentTypeCounts.length > 0 ? contentTypeCounts : [0],
          backgroundColor: '#2196F3',
          borderColor: '#1976D2',
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false,
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
                const value = typeof context.parsed.y === 'number' ? context.parsed.y : 0;
                return `Fields: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 0
            }
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);
    this.chartInstances.push(chart);
  }

  createTagsChart() {
    if (!this.tagsChart || !this.tagsChart.nativeElement) {
      console.warn('Tags chart element not available');
      return;
    }

    const ctx = this.tagsChart.nativeElement.getContext('2d');
    
    const tagNames = this.dashboardData.tags.map(tag => tag.tagName || 'Unnamed');
    const tagColors = this.generateColors(tagNames.length);
    
    const chartConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: tagNames.length > 0 ? tagNames : ['No Tags'],
        datasets: [{
          data: tagNames.length > 0 ? tagNames.map(() => 1) : [1],
          backgroundColor: tagColors,
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 15,
              font: {
                size: 11
              }
            }
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);
    this.chartInstances.push(chart);
  }

  createUsersChart() {
    if (!this.usersChart || !this.usersChart.nativeElement) {
      console.warn('Users chart element not available');
      return;
    }

    const ctx = this.usersChart.nativeElement.getContext('2d');
    
    // Group users by role
    const roleGroups = this.dashboardData.users.reduce((acc: any, user: any) => {
      const role = user.role || 'Unknown';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    const roles = Object.keys(roleGroups);
    const roleCounts = Object.values(roleGroups) as number[];
    
    const chartConfig: ChartConfiguration = {
      type: 'polarArea',
      data: {
        labels: roles.length > 0 ? roles : ['No Users'],
        datasets: [{
          data: roleCounts.length > 0 ? roleCounts : [0],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);
    this.chartInstances.push(chart);
  }

  generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'
    ];
    return colors.slice(0, count);
  }

  // Getter methods for template - now return cached values
  getTotalItems(): number {
    return this.cachedTotalItems;
  }

  getContentGrowthPercentage(): number {
    return this.cachedContentGrowthPercentage;
  }

  getActiveUsersPercentage(): number {
    return this.cachedActiveUsersPercentage;
  }
}