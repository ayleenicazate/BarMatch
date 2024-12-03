import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrincipalComponent } from './principal.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';
import { AuthService } from '../../../services/authService/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;
  let router: Router;

  const mockDeporte = {
    deporte_id: 1,
    nombre: 'Fútbol',
    descripcion: 'Deporte Test',
    imagen: 'assets/login1.png'
  };

  beforeEach(async () => {
    const sqliteServiceMock = {
      init: () => Promise.resolve(),
      dbReady: { pipe: () => ({ subscribe: () => {} }) },
      getDeportes: () => Promise.resolve([])
    };

    const authServiceMock = {
      getCurrentUser: () => ({ username: 'testUser' })
    };

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        PrincipalComponent
      ],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a calendar con goToCalendar', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToCalendar(mockDeporte);
    expect(navigateSpy).toHaveBeenCalledWith(['home/calendar', jasmine.anything()]);
  });

  it('should pasar los parámetros a calendar cuando se navega', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    component.username = 'testUser';
    component.goToCalendar(mockDeporte);

    expect(navigateSpy).toHaveBeenCalledWith(['home/calendar', {
      username: 'testUser',
      deporte: mockDeporte.nombre,
      deporte_id: mockDeporte.deporte_id
    }]);
  });
});
