import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarComponent } from './calendar.component';
import { Router } from '@angular/router';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        CalendarComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a encuentros con goToEncuentros', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.selectedDate = '20-11-2024';
    component.goToEncuentros();
    expect(navigateSpy).toHaveBeenCalledWith(['home/encuentros', jasmine.anything()]);
  });

  it('should pasar los parámetros a encuentros cuando se navega', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    // Configurar datos necesarios
    component.username = 'testUser';
    component.deporte = 'Fútbol';
    component.deporte_id = 1;
    component.selectedDate = '20-11-2024';

    component.goToEncuentros();

    expect(navigateSpy).toHaveBeenCalledWith(['home/encuentros', {
      username: 'testUser',
      deporte: 'Fútbol',
      deporte_id: 1,
      fecha: '20-11-2024'
    }]);
  });
});
