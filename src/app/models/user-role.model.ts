export interface UserRole {
  _id?: string;
  roleName: string;
  tags?: TagInfo | string;
  isInherited?: boolean;
  inHeritedRoleRef?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagInfo {
  _id: string;
  tagName: string;
}

export interface PermissionSet {
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canViewAll: boolean;
}

export interface UserAccess {
  _id?: string;
  roleId: {
    _id: string;
    roleName: string;
  };
  content: PermissionSet;
  contentType: PermissionSet;
  tag: PermissionSet;
  collections: PermissionSet;
  user: PermissionSet;
  userRole: PermissionSet;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAccessResponse {
  data: UserAccess[];
  message: string;
}

export interface UserAccessUpdateRequest {
  content?: PermissionSet;
  contentType?: PermissionSet;
  tag?: PermissionSet;
  collections?: PermissionSet;
  user?: PermissionSet;
  userRole?: PermissionSet;
} 