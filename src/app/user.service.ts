import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteUser(userId: number) {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: number): User {
    throw new Error('Method not implemented.'); 
  }
  public userList: User[] = [];

  constructor() {
    // Retrieve userList from localStorage if available
    const storedData = localStorage.getItem('userList');

    console.log(storedData)
    if (storedData) {
      // this.userList = JSON.parse(storedData);
    }
  }

  saveUserDetails(details: any) {
    this.userList = details;
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }

  getUsers() {
    return this.userList;
  }

  

  addUser(user: User) {
    user.id = this.userList.length + 1; // Assign the new user the next available id in sequence
    this.userList.push(user);
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }
  


}
