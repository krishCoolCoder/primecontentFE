import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  activeRoute: string = '';
  visibleMenuItems: Array<{key: string, label: string, route: string}> = [];

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    // Get initial route
    this.setActiveRoute(this.router.url);
    
    // Initialize menu items from cached permissions
    this.initializeMenuItems();
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setActiveRoute(event.url);
    });
  }

  initializeMenuItems() {
    // Get current cached permissions without making API call
    const currentPermissions = this.permissionService.getCurrentPermissions();
    
    if (currentPermissions) {
      // Use cached permissions to build menu items
      this.visibleMenuItems = this.permissionService.getVisibleMenuItems();
    } else {
      // If no cached permissions, show only dashboard
      this.visibleMenuItems = [{ key: 'dashboard', label: 'Dashboard', route: '/dashboard' }];
    }
    
    // Always subscribe to permission changes to keep sidebar updated
    this.permissionService.permissions$.subscribe({
      next: (permissions) => {
        if (permissions) {
          this.visibleMenuItems = this.permissionService.getVisibleMenuItems();
          console.log('Sidebar updated with permissions');
        } else {
          // No permissions - show only dashboard
          this.visibleMenuItems = [{ key: 'dashboard', label: 'Dashboard', route: '/dashboard' }];
        }
      },
      error: (error) => {
        console.error('Error in permissions subscription:', error);
      }
    });
  }

  setActiveRoute(url: string) {
    if (url.includes('/dashboard')) {
      this.activeRoute = 'dashboard';
    } else if (url.includes('/contentType')) {
      this.activeRoute = 'contentType';
    } else if (url.includes('/content')) {
      this.activeRoute = 'content';
    } else  if (url.includes('/tag')) {
      this.activeRoute = 'tag';
    } else if (url.includes('/collection')) {
      this.activeRoute = 'collection';
    } else if (url.includes('/users')) {
      this.activeRoute = 'users';
    } else if (url.includes('/userAccess')) {
      this.activeRoute = 'userAccess';
    } else if (url.includes('/userRole')) {
      this.activeRoute = 'role';
    } else if (url.includes('/settings')) {
      this.activeRoute = 'settings';
    } else {
      this.activeRoute = '';
    }
  }

  redirect(channel: string) {
    switch (channel) {
      case "dashboard":
        this.router.navigate(["/dashboard"])
        break;
      case "content":
        this.router.navigate(["/content"])
        break;
      case "contentType":
        this.router.navigate(["/contentType"])
        break;
      case "tag":
        this.router.navigate(["/tag"])
        break;
      case "collection":
        this.router.navigate(["/collection"])
        break;
      case "users":
        this.router.navigate(["/users"])
        break;
      case "userAccess":
        this.router.navigate(["/userAccess"])
        break;
      case "role":
        this.router.navigate(["/userRole"])
        break;
      case "settings":
        this.router.navigate(["/settings"])
        break;
      case "loggout":
        console.log("Loggout is clicked : ")
        localStorage.removeItem("userInfo")
        localStorage.removeItem("contentTypeList")
        localStorage.removeItem("token")
        // Clear permissions on logout
        this.permissionService.clearPermissions();
        this.router.navigate(["/"])
        break;
      default:
        console.log("None of the above is passed as argument on redirect function")
    }
  }
}
