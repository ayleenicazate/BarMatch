import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CantpersComponent } from './cantpers.component';
import { Router } from '@angular/router';

describe('CantpersComponent', () => {
  let component: CantpersComponent;
  let fixture: ComponentFixture<CantpersComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        CantpersComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CantpersComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navegar a confirmacion con goToConfirmacion', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.cantidad_personas = 4;
    component.goToConfirmacion();
    expect(navigateSpy).toHaveBeenCalledWith(['/home/confirmacion', jasmine.anything()]);
  });

  it('should pasar los parámetros a confirmacion cuando se navega', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    // Configurar datos necesarios
    component.username = 'testUser';
    component.deporte = 'Fútbol';
    component.fecha = '20-11-2024';
    component.bar_id = 1;
    component.barNombre = 'Bar Test';
    component.barDireccion = 'Calle Test 123';
    component.encuentro_id = 1;
    component.encuentroNombre = 'Partido Test';
    component.cantidad_personas = 4;

    component.goToConfirmacion();

    expect(navigateSpy).toHaveBeenCalledWith(['/home/confirmacion', {
      username: 'testUser',
      deporte: 'Fútbol',
      fecha: '20-11-2024',
      bar_id: 1,
      barNombre: 'Bar Test',
      barDireccion: 'Calle Test 123',
      encuentro_id: 1,
      encuentroNombre: 'Partido Test',
      cantidad_personas: 4
    }]);
  });
});
