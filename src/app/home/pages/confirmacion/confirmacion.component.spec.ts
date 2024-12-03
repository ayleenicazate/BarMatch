import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmacionComponent } from './confirmacion.component';
import { Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

describe('ConfirmacionComponent', () => {
  let component: ConfirmacionComponent;
  let fixture: ComponentFixture<ConfirmacionComponent>;
  let router: Router;
  let sqliteService: jasmine.SpyObj<SqliteService>;

  beforeEach(async () => {
    const sqliteSpy = jasmine.createSpyObj('SqliteService', ['createReserva']);
    sqliteSpy.createReserva.and.returnValue(Promise.resolve({ success: true }));

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ConfirmacionComponent
      ],
      providers: [
        { provide: SqliteService, useValue: sqliteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sqliteService = TestBed.inject(SqliteService) as jasmine.SpyObj<SqliteService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a reservas con goToMisReservas', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.username = 'testUser';
    
    component.goToMisReservas();
    expect(navigateSpy).toHaveBeenCalledWith(['/loading']);
    
    tick(1500);
    expect(navigateSpy).toHaveBeenCalledWith(['/reservas', { username: 'testUser' }]);
  }));

  it('should guardar una reserva', async () => {
    // Configurar datos necesarios
    component.username = 'testUser';
    component.encuentro_id = 1;
    component.bar_id = 1;
    component.cantidad_personas = 4;

    const expectedDate = new Date().toISOString();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(expectedDate));

    // Mock del resultado exitoso con el objeto reserva
    const mockReserva = {
      username: 'testUser',
      encuentro_id: 1,
      bar_id: 1,
      cantidad_personas: 4,
      fecha_reserva: expectedDate
    };

    const expectedResponse = {
      success: true,
      reserva: mockReserva
    };

    sqliteService.createReserva.and.returnValue(Promise.resolve(expectedResponse));

    await component.confirmarReserva();

    expect(sqliteService.createReserva).toHaveBeenCalled();
    expect(await sqliteService.createReserva.calls.mostRecent().returnValue).toEqual(expectedResponse);

    jasmine.clock().uninstall();
  });
});
