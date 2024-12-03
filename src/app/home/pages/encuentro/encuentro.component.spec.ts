import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EncuentroComponent } from './encuentro.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

describe('EncuentroComponent', () => {
  let component: EncuentroComponent;
  let fixture: ComponentFixture<EncuentroComponent>;
  let router: Router;

  const mockEncuentro = {
    id: 1,
    deporte_id: 1,
    fecha: '20-11-2024',
    nombre: 'Partido Test'
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
        EncuentroComponent
      ],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuentroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a bar con seleccionarEncuentro', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.seleccionarEncuentro(mockEncuentro);
    expect(navigateSpy).toHaveBeenCalledWith(['/home/bar', jasmine.anything()]);
  });

  it('should pasar los parámetros a bar cuando se navega', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    // Configurar datos necesarios
    component.username = 'testUser';
    component.deporte = 'Fútbol';

    component.seleccionarEncuentro(mockEncuentro);

    expect(navigateSpy).toHaveBeenCalledWith(['/home/bar', {
      username: 'testUser',
      encuentro_id: mockEncuentro.id,
      encuentro_nombre: mockEncuentro.nombre,
      deporte_id: mockEncuentro.deporte_id,
      deporte: 'Fútbol',
      fecha: mockEncuentro.fecha
    }]);
  });
});
