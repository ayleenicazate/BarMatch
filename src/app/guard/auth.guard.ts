import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log('AuthGuard: Verificando autenticación');
    
    if (this.authService.isAuthenticated()) {
      console.log('AuthGuard: Usuario autenticado');
      return true;
    } else {
      console.log('AuthGuard: Usuario no autenticado, redirigiendo a login');
      return this.router.createUrlTree(['/login']);
    }
  }
}

    