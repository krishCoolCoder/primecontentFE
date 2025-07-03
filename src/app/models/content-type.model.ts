export interface ContentTypeField {
  fieldName: string;
  fieldType: string;
}

export interface ContentType {
  id: string;
  contentTypeName: string;
  contentTypeList: ContentTypeField[];
  createdAt: Date;
} 