import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BarComponent } from './bar.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;
  let router: Router;

  const mockBar = {
    bar_id: 1,
    nombre: 'Bar Test',
    direccion: 'Calle Test 123'
  };

  beforeEach(async () => {
    const sqliteServiceMock = {
      init: () => Promise.resolve(),
      dbReady: { pipe: () => ({ subscribe: () => {} }) }
    };

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        BarComponent
      ],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a cantpers cuando se selecciona un bar', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.seleccionarBar(mockBar);
    expect(navigateSpy).toHaveBeenCalledWith(['/home/cantpers', jasmine.anything()]);
  });

  it('should pasar los parámetros a cantpers cuando se selecciona un bar', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    // Configurar datos necesarios
    component.username = 'testUser';
    component.deporte = 'Fútbol';
    component.encuentro_id = 1;
    component.encuentroNombre = 'Partido Test';
    component.fecha = '2024-03-20';

    // Llamar al método con un bar de prueba
    component.seleccionarBar(mockBar);

    // Verificar que se navega con los parámetros correctos
    expect(navigateSpy).toHaveBeenCalledWith(['/home/cantpers', {
      username: 'testUser',
      deporte: 'Fútbol',
      bar_id: mockBar.bar_id,
      barNombre: mockBar.nombre,
      barDireccion: mockBar.direccion,
      encuentro_id: 1,
      encuentroNombre: 'Partido Test',
      fecha: '2024-03-20'
    }]);
  });
});
