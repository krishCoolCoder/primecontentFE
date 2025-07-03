import { Injectable } from '@angular/core';
import { ContentType } from '../models/content-type.model';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {
  private readonly STORAGE_KEY = 'contentTypeList';

  constructor() { }

  getContentTypes(): ContentType[] {
    const contentTypes = localStorage.getItem(this.STORAGE_KEY);
    return contentTypes ? JSON.parse(contentTypes) : [];
  }

  saveContentType(contentType: ContentType): void {
    const contentTypes = this.getContentTypes();
    contentTypes.push(contentType);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contentTypes));
  }

  updateContentType(updatedContentType: ContentType): void {
    const contentTypes = this.getContentTypes();
    const index = contentTypes.findIndex(ct => ct.id === updatedContentType.id);
    if (index !== -1) {
      contentTypes[index] = updatedContentType;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contentTypes));
    }
  }

  deleteContentType(contentTypeId: string): void {
    const contentTypes = this.getContentTypes();
    const filteredContentTypes = contentTypes.filter(ct => ct.id !== contentTypeId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredContentTypes));
  }

  getContentTypeById(contentTypeId: string): ContentType | undefined {
    const contentTypes = this.getContentTypes();
    return contentTypes.find(ct => ct.id === contentTypeId);
  }

  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
} 