import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';

  constructor() { }

  getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }

  deleteUser(userId: string): void {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));
  }

  getUserById(userId: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === userId);
  }

  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
} 