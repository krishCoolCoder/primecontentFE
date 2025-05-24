import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-content-type-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor],
  templateUrl: './content-type-page.component.html',
  styleUrl: './content-type-page.component.css'
})
export class ContentTypePageComponent {
  contentTypeList : any;
  ngOnInit(){
    this.contentTypeList = JSON.parse(localStorage.getItem("contentTypeList") ?? "[]")
    console.log("the contentTypeList is this : ", this.contentTypeList)
  }
  constructor(private router: Router){}
  redirectToCreateContentType(){
    this.router.navigate(["/createContentType"])
  }
}
