import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserAccess, UserAccessResponse, UserAccessUpdateRequest } from '../models/user-role.model';
import { ToastService } from '../shared/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Helper method to handle errors
  private handleError = (error: any) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.status) {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized access. Please login again.';
          break;
        case 403:
          errorMessage = 'Access forbidden. You don\'t have permission.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText}`;
      }
    }
    
    this.toastService.showError(errorMessage);
    return throwError(() => error);
  };

  // USER ACCESS APIs
  getAllUserAccess(): Observable<UserAccessResponse> {
    return this.http.get<UserAccessResponse>(`${this.baseUrl}/api/userAccess`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserAccessCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/userAccess/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserAccessByRole(roleId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/userAccess/role/${roleId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserAccessById(userAccessId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/userAccess/${userAccessId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateUserAccess(userAccessId: string, permissions: UserAccessUpdateRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/userAccess/${userAccessId}`, permissions, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // USER AUTHENTICATION APIs
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/register`, userData)
      .pipe(catchError(this.handleError));
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // USER MANAGEMENT APIs
  
  // 1. Get All Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get Users Count
  getUsersCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get User by ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Create User (Register)
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/register`, userData)
      .pipe(catchError(this.handleError));
  }

  // 5. Update User
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/users/${userId}`, userData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Delete User
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // TAGS MODULE APIs
  
  // 1. Create Tag
  createTag(tagData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/tags`, tagData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get All Tags
  getAllTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/tags`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get Tags Count
  getTagsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/tags/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Get Tag by ID
  getTagById(tagId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/tags/${tagId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 5. Update Tag
  updateTag(tagId: string, tagData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/tags/${tagId}`, tagData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Delete Tag
  deleteTag(tagId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/tags/${tagId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // CONTENT TYPE MODULE APIs

  // 1. Create Content Type
  createContentType(contentTypeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/content-types`, contentTypeData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get All Content Types
  getAllContentTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/content-types`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get Content Types Count
  getContentTypesCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/content-types/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Get Content Types by Tag
  getContentTypesByTag(tagName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/content-types/tag/${tagName}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 5. Get Content Type by ID
  getContentTypeById(contentTypeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/content-types/${contentTypeId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Update Content Type
  updateContentType(contentTypeId: string, contentTypeData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/content-types/${contentTypeId}`, contentTypeData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 7. Delete Content Type
  deleteContentType(contentTypeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/content-types/${contentTypeId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // CONTENTS MODULE APIs

  // 1. Create Content
  createContent(contentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/contents`, contentData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get All Contents
  getAllContents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/contents`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get Contents Count
  getContentsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/contents/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Get Contents by Content Type
  getContentsByContentType(contentTypeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/contents/content-type/${contentTypeId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 5. Get Contents Count by Content Type
  getContentsCountByContentType(contentTypeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/contents/content-type/${contentTypeId}/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Get Content by ID
  getContentById(contentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/contents/${contentId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 7. Update Content
  updateContent(contentId: string, contentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/contents/${contentId}`, contentData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 8. Delete Content
  deleteContent(contentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/contents/${contentId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // COLLECTION MODULE APIs (Note: These are at root level, not under /api/)

  // 1. Create Collection
  createCollection(collectionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/collection`, collectionData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get All Collections
  getAllCollections(): Observable<any> {
    return this.http.get(`${this.baseUrl}/collection`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get Collection by ID
  getCollectionById(collectionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/collection/${collectionId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Update Collection
  updateCollection(collectionId: string, collectionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/collection/${collectionId}`, collectionData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 5. Delete Collection
  deleteCollection(collectionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/collection/${collectionId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Get Collections Count
  getCollectionsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/collection/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 7. Get Collection Contents by Collection Name (with filtering)
  getCollectionContents(collectionName: string, filters?: { [key: string]: string }): Observable<any> {
    let url = `${this.baseUrl}/collection/${collectionName}/contents`;
    
    if (filters && Object.keys(filters).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url += `?${queryParams.toString()}`;
    }
    
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // UTILITY METHODS
  
  // Check if token exists
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Store token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Remove token
  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }

  // Store user info
  setUserInfo(userInfo: any): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  // Get user info
  getUserInfo(): any {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  // USER SERVICE HELPER METHODS (for handling userName/username mapping)
  
  // Get users with username mapping
  getUsersWithMapping(): Observable<any> {
    return this.getAllUsers().pipe(
      map((response: any) => ({
        ...response,
        data: response.data.map((user: any) => ({
          ...user,
          username: user.userName || user.email || ''
        }))
      }))
    );
  }

  // Get user by ID with username mapping
  getUserByIdWithMapping(userId: string): Observable<any> {
    return this.getUserById(userId).pipe(
      map((response: any) => ({
        ...response,
        data: {
          ...response.data,
          username: response.data.userName || response.data.email || ''
        }
      }))
    );
  }

  // Create user with userName mapping
  createUserWithMapping(userData: any): Observable<any> {
    const mappedUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.username, // Map username to userName for API
      email: userData.email,
      password: userData.password,
      role: userData.role
    };
    return this.createUser(mappedUserData);
  }

  // Update user with userName mapping
  updateUserWithMapping(userId: string, userData: any): Observable<any> {
    const mappedUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.username, // Map username to userName for API
      email: userData.email,
      role: userData.role
    };
    return this.updateUser(userId, mappedUserData);
  }

  // Get users count
  getUsersCountData(): Observable<number> {
    return this.getUsersCount().pipe(
      map((response: any) => response.data.count)
    );
  }

  // CONTENT SERVICE HELPER METHODS

  // Get all contents
  getAllContentsData(): Observable<any[]> {
    return this.getAllContents().pipe(
      map((response: any) => response.data)
    );
  }

  // Get content by ID
  getContentByIdData(contentId: string): Observable<any> {
    return this.getContentById(contentId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get contents count
  getContentsCountData(): Observable<number> {
    return this.getContentsCount().pipe(
      map((response: any) => response.data.count)
    );
  }

  // Get contents by content type
  getContentsByContentTypeData(contentTypeId: string): Observable<any[]> {
    return this.getContentsByContentType(contentTypeId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get contents count by content type
  getContentsCountByContentTypeData(contentTypeId: string): Observable<number> {
    return this.getContentsCountByContentType(contentTypeId).pipe(
      map((response: any) => response.data.count)
    );
  }

  // TAG SERVICE HELPER METHODS

  // Get all tags data
  getAllTagsData(): Observable<any[]> {
    return this.getAllTags().pipe(
      map((response: any) => response.data)
    );
  }

  // Get tag by ID data
  getTagByIdData(tagId: string): Observable<any> {
    return this.getTagById(tagId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get tags count data
  getTagsCountData(): Observable<number> {
    return this.getTagsCount().pipe(
      map((response: any) => response.data.count)
    );
  }

  // CONTENT TYPE SERVICE HELPER METHODS

  // Get all content types data
  getAllContentTypesData(): Observable<any[]> {
    return this.getAllContentTypes().pipe(
      map((response: any) => response.data)
    );
  }

  // Get content type by ID data
  getContentTypeByIdData(contentTypeId: string): Observable<any> {
    return this.getContentTypeById(contentTypeId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get content types count data
  getContentTypesCountData(): Observable<number> {
    return this.getContentTypesCount().pipe(
      map((response: any) => response.data.count)
    );
  }

  // USER ROLE MODULE APIs

  // 1. Create User Role
  createUserRole(userRoleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/userRole`, userRoleData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 2. Get All User Roles
  getAllUserRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/userRole`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 3. Get User Roles Count
  getUserRolesCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/userRole/count`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 4. Get User Roles by Tag
  getUserRolesByTag(tagId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/userRole/tag/${tagId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 5. Get User Role by ID
  getUserRoleById(userRoleId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/userRole/${userRoleId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 6. Update User Role
  updateUserRole(userRoleId: string, userRoleData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/userRole/${userRoleId}`, userRoleData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // 7. Delete User Role
  deleteUserRole(userRoleId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/userRole/${userRoleId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // USER ROLE SERVICE HELPER METHODS

  // Get all user roles data
  getAllUserRolesData(): Observable<any[]> {
    return this.getAllUserRoles().pipe(
      map((response: any) => response.data)
    );
  }

  // Get user role by ID data
  getUserRoleByIdData(userRoleId: string): Observable<any> {
    return this.getUserRoleById(userRoleId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get user roles count data
  getUserRolesCountData(): Observable<any> {
    return this.getUserRolesCount().pipe(
      map((response: any) => response.data)
    );
  }

  // COLLECTION SERVICE HELPER METHODS

  // Get all collections data
  getAllCollectionsData(): Observable<any[]> {
    return this.getAllCollections().pipe(
      map((response: any) => response.data)
    );
  }

  // Get collection by ID data
  getCollectionByIdData(collectionId: string): Observable<any> {
    return this.getCollectionById(collectionId).pipe(
      map((response: any) => response.data)
    );
  }

  // Get collections count data
  getCollectionsCountData(): Observable<number> {
    return this.getCollectionsCount().pipe(
      map((response: any) => response.data.count)
    );
  }

  // Get collection contents data
  getCollectionContentsData(collectionName: string, filters?: { [key: string]: string }): Observable<any[]> {
    return this.getCollectionContents(collectionName, filters).pipe(
      map((response: any) => response.data)
    );
  }
} 