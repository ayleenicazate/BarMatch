import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Usuarios en duro para simular la autenticación
  private users = [
    { username: 'usuario1', password: 'contraseña1' },
    { username: 'víctor', password: '1234' }
  ];

  constructor() {
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus() {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (token && user) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return of(this.checkCredentials(credentials)).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
          this.currentUserSubject.next(response.user);
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
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
