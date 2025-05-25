import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.css'
})
export class TagsPageComponent {
  tags: any;
  constructor(private router: Router) {}
  ngOnInit(){
    this.tags = JSON.parse(localStorage.getItem("tags")??"[]")
    console.log("The tags are this : ", this.tags)
  }
  redirectToCreateTagPage(){
    this.router.navigate(["/createTagPage"])
  }

}
