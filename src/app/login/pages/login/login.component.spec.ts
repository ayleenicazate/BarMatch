import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../../../app.component';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;
  let alertController: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getLastUsername'], {
      isLoggedIn$: new BehaviorSubject<boolean>(false)
    });
    authServiceSpy.getLastUsername.and.returnValue('testUser');
    
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    
    // Mock del alert
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        LoginComponent
      ],
      providers: [
        { provide: AppComponent, useValue: {} },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should crear alerta cuando los campos están vacíos', async () => {
    // Configurar campos vacíos
    component.username = '';
    component.password = '';

    await component.login();

    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor ingrese usuario y contraseña',
      buttons: ['OK']
    });
  });

  it('should navegar al home cuando el login es exitoso', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    authService.login.and.returnValue(Promise.resolve({ success: true }));
    
    component.username = 'testUser';
    component.password = 'testPass';

    component.login();
    tick(); // Para el primer navigate

    expect(navigateSpy).toHaveBeenCalledWith(['/loading']);
    
    tick(1500); // Para el setTimeout
    
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));
});
