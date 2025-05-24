import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor ( private router : Router){}

  redirect (channel: string){
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
