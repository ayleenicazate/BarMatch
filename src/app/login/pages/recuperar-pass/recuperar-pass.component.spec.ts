import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../../../app.component';
import { RecuperarPassComponent } from './recuperar-pass.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

describe('RecuperarPassComponent', () => {
  let component: RecuperarPassComponent;
  let fixture: ComponentFixture<RecuperarPassComponent>;
  let router: Router;
  let sqliteService: jasmine.SpyObj<SqliteService>;
  let alertController: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    const sqliteServiceSpy = jasmine.createSpyObj('SqliteService', ['getUserByUsername']);
    const alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    
    // Mock del alert
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        RecuperarPassComponent
      ],
      providers: [
        { provide: AppComponent, useValue: {} },
        { provide: SqliteService, useValue: sqliteServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPassComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sqliteService = TestBed.inject(SqliteService) as jasmine.SpyObj<SqliteService>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should crear alerta cuando el campo está vacío', async () => {
    component.userEmail = '';
    await component.resetPassword();

    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, introduce un Usuario válido.',
      buttons: ['OK']
    });
  });

  it('should navegar al login cuando el usuario existe', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    sqliteService.getUserByUsername.and.returnValue(Promise.resolve({ username: 'testUser' }));
    
    component.userEmail = 'testUser';
    component.resetPassword();
    tick();

    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Solicitud Recibida',
      message: 'Lo contactaremos para cambiar su contraseña.',
      buttons: ['OK']
    });

    expect(navigateSpy).toHaveBeenCalledWith(['/loading']);
    tick(1500);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));

  it('should mostrar error cuando el usuario no existe', async () => {
    sqliteService.getUserByUsername.and.returnValue(Promise.resolve(null));
    
    component.userEmail = 'noExiste';
    await component.resetPassword();

    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Usuario no registrado. Por favor, introduce un Usuario válido.',
      buttons: ['OK']
    });
  });
});
