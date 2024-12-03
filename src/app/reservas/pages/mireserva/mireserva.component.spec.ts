import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MireservaComponent } from './mireserva.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

describe('MireservaComponent', () => {
  let component: MireservaComponent;
  let fixture: ComponentFixture<MireservaComponent>;
  let router: Router;

  const mockReservaParams = {
    username: 'testUser',
    deporte: 'Fútbol',
    fecha: '2024-03-20',
    barNombre: 'Bar Test',
    encuentroNombre: 'Partido Test',
    cantidad_personas: '4',
    barDireccion: 'Calle Test 123'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MireservaComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(mockReservaParams)
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MireservaComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navegar a home con goToHome', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    
    component.goToHome();
    
    expect(navigateSpy).toHaveBeenCalledWith(['/loading']);
    tick(1500);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  it('should navegar a misReservas con goToMisReservas pasando el username', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.username = 'testUser';
    
    component.goToMisReservas();
    
    expect(navigateSpy).toHaveBeenCalledWith(['/reservas', { 
      username: 'testUser' 
    }]);
  });
});
