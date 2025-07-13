export interface UserRole {
  _id?: string;
  roleName: string;
  tags?: string | TagInfo;
  isInherited?: boolean;
  inHeritedRoleRef?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface TagInfo {
  _id: string;
  tagName: string;
  description: string;
} 