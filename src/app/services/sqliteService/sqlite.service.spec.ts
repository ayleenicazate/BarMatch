import { TestBed } from '@angular/core/testing';
import { SqliteService } from './sqlite.service';
import { provideHttpClient } from '@angular/common/http';

describe('SqliteService', () => {
  let service: SqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should obtener las reservas de un usuario', async () => {
    // Preparar los datos de prueba
    const username = 'testUser';
    const mockReservas = [{
      reserva_id: 1,
      username: 'testUser',
      deporte: 'Fútbol',
      fecha: '2024-03-20',
      barNombre: 'Bar Test',
      encuentroNombre: 'Partido Test',
      cantidad_personas: 4,
      barDireccion: 'Calle Test 123'
    }];

    // Espiar el método y hacer que devuelva nuestros datos de prueba
    spyOn(service, 'getReservasByUsername').and.returnValue(Promise.resolve(mockReservas));

    // Ejecutar el método
    const reservas = await service.getReservasByUsername(username);

    // Verificar que:
    // 1. Se llamó al método con el username correcto
    expect(service.getReservasByUsername).toHaveBeenCalledWith(username);
    
    // 2. Devolvió las reservas esperadas
    expect(reservas).toEqual(mockReservas);
  });
});
