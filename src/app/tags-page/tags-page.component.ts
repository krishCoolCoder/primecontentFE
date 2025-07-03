import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.css'
})
export class TagsPageComponent implements OnInit {
  tags: any[] = [];
  isFilterOpen: boolean = false;
  listView: boolean = true;
  gridView: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.tags = JSON.parse(localStorage.getItem('tags') ?? '[]');
  }

  redirectToCreateTagPage() {
    this.router.navigate(['/createTag']);
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
