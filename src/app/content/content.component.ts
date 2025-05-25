import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  constructor(private router: Router){}
  contentList : any;
  ngOnInit(){
    this.contentList = JSON.parse(localStorage.getItem("content") ?? "[]");
    console.log("The contentList data is this : ", this.contentList)
  }
  redirectToCreateContent(){
    this.router.navigate(["/createContent"])
  }
}
