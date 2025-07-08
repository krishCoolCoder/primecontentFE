import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-tags-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, NgFor, FormsModule],
  templateUrl: './create-tags-page.component.html',
  styleUrl: './create-tags-page.component.css'
})
export class CreateTagsPageComponent {
  @ViewChild('tagForm') tagForm!: NgForm;
  tag = { tagName: "", description: "" };
  
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  createTag() {
    console.log("=== CREATE TAG FUNCTION CALLED ===");
    console.log("Create tag button clicked");
    console.log("Form valid:", this.tagForm?.valid);
    console.log("The tag is this : ", this.tag);
    console.log("Tag name length:", this.tag.tagName?.length);
    console.log("Tag name trimmed:", this.tag.tagName?.trim());
    
    // Validate that tag name is not empty
    if (!this.tag.tagName || this.tag.tagName.trim() === '') {
      console.error("Tag name is required");
      alert("Tag name is required");
      return;
    }
    
    const tagData = {
      tagName: this.tag.tagName.trim(),
      description: this.tag.description ? this.tag.description.trim() : ""
    };
    
    console.log("Tag data to be sent:", tagData);
    
    this.apiService.createTag(tagData).subscribe({
      next: (response) => {
        console.log('Tag created successfully:', response);
        alert('Tag created successfully!');
        this.router.navigate(["/tag"]);
      },
      error: (error) => {
        console.error('Error creating tag:', error);
        alert('Error creating tag. Please try again.');
      }
    });
  }

  redirectToTagList(){
    this.router.navigate(["/tag"])
  }
}
