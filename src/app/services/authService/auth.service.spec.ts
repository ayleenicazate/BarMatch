import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SqliteService } from '../sqliteService/sqlite.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const sqliteServiceSpy = jasmine.createSpyObj('SqliteService', ['getUserByUsername']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Limpiar sessionStorage antes de cada prueba
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cerrar sesión y navegar al login', () => {
    // Preparar: guardar un usuario en sessionStorage
    const mockUser = { username: 'testUser' };
    sessionStorage.setItem('currentUser', JSON.stringify(mockUser));
    
    // Ejecutar logout
    service.logout();

    // Verificar que:
    // 1. Se eliminó el usuario de sessionStorage
    expect(sessionStorage.getItem('currentUser')).toBeNull();
    
    // 2. Se actualizó el estado de autenticación
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
    });
    
    // 3. Se navegó a la página de login
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
