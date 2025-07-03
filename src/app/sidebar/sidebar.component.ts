import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Get initial route
    this.setActiveRoute(this.router.url);
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setActiveRoute(event.url);
    });
  }

  setActiveRoute(url: string) {
    if (url.includes('/dashboard')) {
      this.activeRoute = 'dashboard';
    } else if (url.includes('/content')) {
      this.activeRoute = 'content';
    } else if (url.includes('/contentType')) {
      this.activeRoute = 'contentType';
    } else if (url.includes('/tag')) {
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
        this.router.navigate(["/"])
        break;
      default:
        console.log("None of the above is passed as argument on redirect function")
    }
  }
}
