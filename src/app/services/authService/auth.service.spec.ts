import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SqliteService } from '../sqliteService/sqlite.service';

import { AuthService } from './auth.service';

// Mock del SqliteService
const mockSqliteService = {
  createUser: jasmine.createSpy('createUser').and.returnValue(Promise.resolve()),
  getUser: jasmine.createSpy('getUser').and.returnValue(Promise.resolve()),
  updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve()),
  deleteUser: jasmine.createSpy('deleteUser').and.returnValue(Promise.resolve())
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: SqliteService, useValue: mockSqliteService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
