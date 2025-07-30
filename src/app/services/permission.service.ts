import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UserAccess, PermissionSet } from '../models/user-role.model';

export interface UserPermissions {
  content: PermissionSet;
  contentType: PermissionSet;
  tag: PermissionSet;
  collections: PermissionSet;
  user: PermissionSet;
  userRole: PermissionSet;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionsSubject = new BehaviorSubject<UserPermissions | null>(null);
  public permissions$ = this.permissionsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  /**
   * Load permissions for the current user
   */
  loadUserPermissions(): Observable<UserPermissions | null> {
    const userInfo = this.apiService.getUserInfo();
    
    if (!userInfo || !userInfo.userRoleId) {
      console.warn('No user info or role ID found');
      return of(null);
    }

    return this.apiService.getUserAccessByRole(userInfo.userRoleId).pipe(
      map((response: any) => {
        if (response && response.data) {
          const userAccess = response.data as UserAccess;
          const permissions: UserPermissions = {
            content: userAccess.content,
            contentType: userAccess.contentType,
            tag: userAccess.tag,
            collections: userAccess.collections,
            user: userAccess.user,
            userRole: userAccess.userRole
          };
          
          this.permissionsSubject.next(permissions);
          console.log('User permissions loaded successfully');
          return permissions;
        }
        
        console.warn('No user access data found');
        this.permissionsSubject.next(null);
        return null;
      }),
      catchError((error) => {
        console.error('Error loading user permissions:', error);
        this.permissionsSubject.next(null);
        return of(null);
      })
    );
  }

  /**
   * Get current permissions (synchronous)
   */
  getCurrentPermissions(): UserPermissions | null {
    return this.permissionsSubject.value;
  }

  /**
   * Check if user has read permission for a module
   */
  hasReadPermission(module: keyof UserPermissions): boolean {
    const permissions = this.getCurrentPermissions();
    return permissions?.[module]?.canRead || false;
  }

  /**
   * Check if user has create permission for a module
   */
  hasCreatePermission(module: keyof UserPermissions): boolean {
    const permissions = this.getCurrentPermissions();
    return permissions?.[module]?.canCreate || false;
  }

  /**
   * Check if user has update/edit permission for a module
   */
  hasUpdatePermission(module: keyof UserPermissions): boolean {
    const permissions = this.getCurrentPermissions();
    return permissions?.[module]?.canUpdate || false;
  }

  /**
   * Check if user has delete permission for a module
   */
  hasDeletePermission(module: keyof UserPermissions): boolean {
    const permissions = this.getCurrentPermissions();
    return permissions?.[module]?.canDelete || false;
  }

  /**
   * Check if user has view all permission for a module
   */
  hasViewAllPermission(module: keyof UserPermissions): boolean {
    const permissions = this.getCurrentPermissions();
    return permissions?.[module]?.canViewAll || false;
  }

  /**
   * Clear permissions (useful for logout)
   */
  clearPermissions(): void {
    this.permissionsSubject.next(null);
  }

  /**
   * Get sidebar menu items based on read permissions
   */
  getVisibleMenuItems(): Array<{key: string, label: string, route: string}> {
    const allMenuItems = [
      { key: 'dashboard', label: 'Dashboard', route: '/dashboard', module: null }, // Dashboard is always visible
      { key: 'content', label: 'Content', route: '/content', module: 'content' as keyof UserPermissions },
      { key: 'contentType', label: 'Content Type', route: '/contentType', module: 'contentType' as keyof UserPermissions },
      { key: 'tag', label: 'Tag', route: '/tag', module: 'tag' as keyof UserPermissions },
      { key: 'collection', label: 'Collection', route: '/collection', module: 'collections' as keyof UserPermissions },
      { key: 'users', label: 'Users', route: '/users', module: 'user' as keyof UserPermissions },
      { key: 'userAccess', label: 'Users Access', route: '/userAccess', module: 'userRole' as keyof UserPermissions },
      { key: 'role', label: 'Users Role', route: '/userRole', module: 'userRole' as keyof UserPermissions }
    ];

    return allMenuItems.filter(item => {
      if (!item.module) return true; // Always show dashboard
      return this.hasReadPermission(item.module);
    });
  }
}