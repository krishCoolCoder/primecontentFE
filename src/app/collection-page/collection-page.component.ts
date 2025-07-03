import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor, CommonModule } from '@angular/common';
import { FilterModalComponent } from '../modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, CommonModule, FilterModalComponent],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.css'
})
export class CollectionPageComponent implements OnInit {
  collectionList: any[] = [];
  isFilterOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionList = JSON.parse(localStorage.getItem('collections') ?? '[]');
  }

  redirectToCreateCollection() {
    this.router.navigate(['/createCollection']);
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  closeFilter() {
    this.isFilterOpen = false;
  }
}
