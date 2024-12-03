import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AvatarService } from './api.service';

describe('AvatarService', () => {
  let service: AvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvatarService]
    });
    service = TestBed.inject(AvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should obtener adecuadamente la url del avatar para un nombre', () => {
    const nombreUsuario = 'Juan Perez';
    const urlAvatar = service.getAvatar(nombreUsuario);
    
    const urlEsperada = 'https://ui-avatars.com/api/?name=Juan%20Perez&background=0000AD&color=fff&size=128&bold=true&format=png';
    expect(urlAvatar).toBe(urlEsperada);
  });
});
