export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password?: string;
  role: string;
  userRoleId: string;
  createdAt: Date;
  updatedAt?: Date;
} 