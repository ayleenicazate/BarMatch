import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  public currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private users: User[] = [
    { username: 'usuario1', password: 'contraseña1' },
    { username: 'Raúl', password: '1234' }
  ];

  constructor() {
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus() {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (token && user) {
      if (this.validateStoredUser(user)) {
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  private validateStoredUser(user: User): boolean {
    return this.users.some(u => u.username === user.username && u.password === user.password);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const result = this.checkCredentials(credentials);
    return of(result).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
          this.currentUserSubject.next(response.user);
        } else {
          this.logout();
        }
      })
    );
  }

  private checkCredentials(credentials: { username: string, password: string }): any {
    const user = this.users.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return { 
        success: true, 
        token: 'fake-jwt-token',
        user: userWithoutPassword
      };
    } else {
      return { success: false, message: 'Credenciales inválidas' };
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserSubject');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  logoutmenu() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserSubject');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

}
