import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserAccess, PermissionSet, UserAccessUpdateRequest } from '../models/user-role.model';

@Component({
  selector: 'app-user-access-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgFor, NgIf, TitleCasePipe, RouterModule],
  templateUrl: './user-access-page.component.html',
  styleUrl: './user-access-page.component.css'
})
export class UserAccessPageComponent implements OnInit {
  userAccessList: UserAccess[] = [];
  loading = false;
  error: string | null = null;
  saving = false;
  
  // Track changes for batch updates
  pendingUpdates: Map<string, UserAccessUpdateRequest> = new Map();
  
  // Permission categories for better organization
  permissionCategories = [
    {
      name: 'Content',
      key: 'content',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    },
    {
      name: 'Content Type',
      key: 'contentType',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    },
    {
      name: 'Tag',
      key: 'tag',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    },
    {
      name: 'Collection',
      key: 'collections',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    },
    {
      name: 'User',
      key: 'user',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    },
    {
      name: 'User Role',
      key: 'userRole',
      permissions: ['canViewAll', 'canRead', 'canCreate', 'canUpdate', 'canDelete']
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserAccess();
  }

  loadUserAccess() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getAllUserAccess().subscribe({
      next: (response) => {
        this.userAccessList = response.data || [];
        this.loading = false;
        console.log('User access data loaded:', this.userAccessList);
      },
      error: (error) => {
        console.error('Error loading user access:', error);
        this.error = 'Failed to load user access data. Please try again.';
        this.loading = false;
      }
    });
  }

  onPermissionChange(userAccess: UserAccess, categoryKey: string, permission: string, event: any) {
    const isChecked = event.target.checked;
    const userAccessId = userAccess._id!;
    
    // Get or create pending update for this user access record
    let pendingUpdate = this.pendingUpdates.get(userAccessId);
    if (!pendingUpdate) {
      pendingUpdate = {};
      this.pendingUpdates.set(userAccessId, pendingUpdate);
    }
    
    // Ensure the category exists in pending update
    if (!pendingUpdate[categoryKey as keyof UserAccessUpdateRequest]) {
      pendingUpdate[categoryKey as keyof UserAccessUpdateRequest] = {
        ...userAccess[categoryKey as keyof UserAccess] as PermissionSet
      };
    }
    
    // Update the specific permission
    const categoryPermissions = pendingUpdate[categoryKey as keyof UserAccessUpdateRequest] as PermissionSet;
    categoryPermissions[permission as keyof PermissionSet] = isChecked;
    
    console.log(`Permission change - Role: ${userAccess.roleId.roleName}, Category: ${categoryKey}, Permission: ${permission}, Value: ${isChecked}`);
    console.log('Pending updates:', this.pendingUpdates);
  }

  getPermissionValue(userAccess: UserAccess, categoryKey: string, permission: string): boolean {
    const userAccessId = userAccess._id!;
    const pendingUpdate = this.pendingUpdates.get(userAccessId);
    
    if (pendingUpdate && pendingUpdate[categoryKey as keyof UserAccessUpdateRequest]) {
      const categoryPermissions = pendingUpdate[categoryKey as keyof UserAccessUpdateRequest] as PermissionSet;
      return categoryPermissions[permission as keyof PermissionSet];
    }
    
    // Return original value if no pending update
    const categoryPermissions = userAccess[categoryKey as keyof UserAccess] as PermissionSet;
    return categoryPermissions[permission as keyof PermissionSet];
  }

  async savePermissions() {
    if (this.pendingUpdates.size === 0) {
      alert('No changes to save.');
      return;
    }

    this.saving = true;
    const updates = Array.from(this.pendingUpdates.entries());
    
    try {
      // Process updates sequentially to avoid overwhelming the server
      for (const [userAccessId, updateData] of updates) {
        await this.apiService.updateUserAccess(userAccessId, updateData).toPromise();
        console.log(`Updated permissions for user access ID: ${userAccessId}`);
      }
      
      // Clear pending updates and reload data
      this.pendingUpdates.clear();
      this.loadUserAccess();
      alert('Permissions updated successfully!');
      
    } catch (error) {
      console.error('Error saving permissions:', error);
      alert('Error saving permissions. Please try again.');
    } finally {
      this.saving = false;
    }
  }

  resetPermissions() {
    if (this.pendingUpdates.size === 0) {
      alert('No changes to reset.');
      return;
    }
    
    if (confirm('Are you sure you want to reset all unsaved changes?')) {
      this.pendingUpdates.clear();
      console.log('Pending updates cleared');
    }
  }

  hasPendingChanges(): boolean {
    return this.pendingUpdates.size > 0;
  }
}
