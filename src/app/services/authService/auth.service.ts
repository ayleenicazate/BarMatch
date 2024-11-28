import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SqliteService } from '../sqliteService/sqlite.service';
import { Router } from '@angular/router';


interface User {
  username: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private sqliteService: SqliteService, private router: Router) {
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus() {
    const currentUser = sessionStorage.getItem('currentUser');
    this.isLoggedInSubject.next(!!currentUser);
  }

  async login(credentials: { username: string, password: string }): Promise<any> {
    try {
      const user = await this.sqliteService.getUserByUsername(credentials.username);
      
      if (user && user.password === credentials.password) {
        const userInfo = { username: user.username };
        sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
        this.isLoggedInSubject.next(true);
        return { success: true, user: userInfo };
      } else {
        this.isLoggedInSubject.next(false);
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      this.isLoggedInSubject.next(false);
      console.error('Error en login:', error);
      return { success: false, message: 'Error en el servidor' };
    }
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$;
  }

}
