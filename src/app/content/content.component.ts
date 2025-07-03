import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CreateContentModelComponent } from '../modals/create-content-model/create-content-model.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, NgIf, FilterModalComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  listView: boolean = true;
  gridView: boolean = false;
  isFilterOpen: boolean = false;
  constructor(private router: Router){}
  contentList : any;
  ngOnInit(){
    this.contentList = JSON.parse(localStorage.getItem("content") ?? "[]");
    console.log("The contentList data is this : ", this.contentList)
  }
  redirectToCreateContent(){
    this.router.navigate(["/createContent"])
  }
  setGridView() {
    this.listView = false;
    this.gridView = true;
  }
  setListView() {
    this.listView = true;
    this.gridView = false;
  }
  openFilter() {
    this.isFilterOpen = true;
  }
  closeFilter() {
    this.isFilterOpen = false;
  }
}
