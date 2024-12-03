import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservasComponent } from './reservas.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;
  let router: Router;
  let sqliteService: jasmine.SpyObj<SqliteService>;

  const mockReserva = {
    reserva_id: 1,
    username: 'testUser',
    deporte: 'Fútbol',
    fecha: '2024-03-20',
    barNombre: 'Bar Test',
    encuentroNombre: 'Partido Test',
    cantidad_personas: 4,
    barDireccion: 'Calle Test 123',
    fecha_reserva: '2024-03-19'
  };

  beforeEach(async () => {
    const sqliteServiceSpy = jasmine.createSpyObj('SqliteService', ['getReservasByUsername']);
    sqliteServiceSpy.getReservasByUsername.and.returnValue(Promise.resolve([mockReserva]));

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ReservasComponent
      ],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sqliteService = TestBed.inject(SqliteService) as jasmine.SpyObj<SqliteService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a mi reserva con goToMiReserva', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToReserva(mockReserva);
    expect(navigateSpy).toHaveBeenCalledWith(['/reservas/mireserva', jasmine.anything()]);
  });

  it('should navegar a mireserva con los parámetros correctos', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    // Establecer el username en el componente
    component.username = 'testUser';

    const mockReserva = {
      username: 'testUser',
      deporte: 'Fútbol',
      fecha: '2024-03-20',
      barNombre: 'Bar Test',
      encuentroNombre: 'Partido Test',
      cantidad_personas: 4,
      barDireccion: 'Calle Test 123'
    };

    component.goToReserva(mockReserva);

    expect(navigateSpy).toHaveBeenCalledWith(['/reservas/mireserva', {
      username: 'testUser',
      deporte: mockReserva.deporte,
      fecha: mockReserva.fecha,
      barNombre: mockReserva.barNombre,
      encuentroNombre: mockReserva.encuentroNombre,
      cantidad_personas: mockReserva.cantidad_personas,
      barDireccion: mockReserva.barDireccion
    }]);
  });
});
