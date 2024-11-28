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
});
