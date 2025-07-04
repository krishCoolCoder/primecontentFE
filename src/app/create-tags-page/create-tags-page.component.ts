import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router){}

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
    
    try {
      let existingTags = JSON.parse(localStorage.getItem("tags")??"[]");
      console.log("Existing tags before adding:", existingTags);
      
      // Create a new tag object to avoid reference issues
      const newTag = {
        tagName: this.tag.tagName.trim(),
        description: this.tag.description ? this.tag.description.trim() : ""
      };
      
      console.log("New tag to be added:", newTag);
      
      existingTags.push(newTag);
      console.log("Tags after adding new tag:", existingTags);
      
      localStorage.setItem("tags", JSON.stringify(existingTags));
      console.log("Tag saved to localStorage successfully");
      
      console.log("Navigating to /tag");
      this.router.navigate(["/tag"]);
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Error creating tag. Please try again.");
    }
  }

  // Backup method in case form submission doesn't work
  createTagClick() {
    console.log("=== CREATE TAG CLICK METHOD CALLED ===");
    this.createTag();
  }

  redirectToTagList(){
    this.router.navigate(["/tag"])
  }

}
