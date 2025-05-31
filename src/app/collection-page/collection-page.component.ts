import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent {

  collectionList : any;
  constructor(private router: Router){}

  ngOnInit() {
    this.collectionList = JSON.parse(localStorage.getItem("collections") ?? "[]");
    console.log("The collectionList is this : ", this.collectionList)
  }

  redirectToCreateCollection() {
    this.router.navigate(["/createCollection"])
  }

}
