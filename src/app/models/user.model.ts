export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password?: string;
  role: string;
  createdAt: Date;
  updatedAt?: Date;
} 