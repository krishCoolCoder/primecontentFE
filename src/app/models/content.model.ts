export interface Content {
  _id?: string;
  contentType: string;
  contentTypeId?: string;
  tagId?: string;
  tagName?: string;
  contentFields: ContentField[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentField {
  fieldName: string;
  fieldValue: string;
  fieldType?: string;
} 