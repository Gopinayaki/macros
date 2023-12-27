import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token?true:false;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  public logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('GroupId')
    localStorage.removeItem('UserId')
  }
}
