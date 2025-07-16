export interface FilterField {
  fieldName: string;
  filterName: string;
  isMandatory: boolean;
}

export interface ContentTypeInfo {
  _id: string;
  contentTypeName: string;
}

export interface Collection {
  _id?: string;
  collectionName: string;
  api: string;
  contentType?: string; // For backward compatibility
  contentTypeId: string | ContentTypeInfo;
  filters: FilterField[];
  createdAt?: string;
  createdBy?: string | null;
  updatedAt?: string;
  updatedBy?: string | null;
}

export interface CollectionResponse {
  data: Collection[];
  message: string;
}

export interface CollectionCreateRequest {
  collectionName: string;
  api: string;
  contentTypeId: string;
  filters: FilterField[];
}

export interface CollectionUpdateRequest {
  collectionName?: string;
  api?: string;
  contentTypeId?: string;
  filters?: FilterField[];
}

export interface CollectionContentResponse {
  data: any[];
  message: string;
} 