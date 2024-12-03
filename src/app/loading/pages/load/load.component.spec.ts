import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadComponent } from './load.component';
import { Animation, AnimationController } from '@ionic/angular';
import { ElementRef } from '@angular/core';

describe('LoadComponent', () => {
  let component: LoadComponent;
  let fixture: ComponentFixture<LoadComponent>;
  let animationSpy: jasmine.SpyObj<Animation>;
  let animationController: jasmine.SpyObj<AnimationController>;

  beforeEach(async () => {
    // Crear spies para la animación y el controlador
    animationSpy = jasmine.createSpyObj<Animation>('Animation', ['play', 'pause', 'stop']);
    animationController = jasmine.createSpyObj('AnimationController', ['create']);
    
    // Configurar el spy del controlador para devolver la animación mock
    const animationChain = {
      create: () => animationController,
      addElement: () => animationChain,
      duration: () => animationChain,
      iterations: () => animationChain,
      keyframes: () => animationChain,
      addAnimation: () => animationSpy
    };
    animationController.create.and.returnValue(animationChain as any);

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        LoadComponent
      ],
      providers: [
        { provide: AnimationController, useValue: animationController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadComponent);
    component = fixture.componentInstance;

    // Mock del QueryList para cardElements
    const mockElementRef = new ElementRef(document.createElement('div'));
    (component as any).cardElements = {
      get: () => mockElementRef
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should iniciar correctamente la animación cuando se llama a play', () => {
    // Arrange: configuramos el estado inicial
    component.stop(); // Aseguramos que la animación esté detenida inicialmente
    
    // Act: ejecutamos la acción
    component.play();
    
    // Assert: verificamos el resultado
    expect(animationSpy.play).toHaveBeenCalled();
    expect(component.isAnimationPlaying()).toBeTrue();
  });

  it('should pausar correctamente la animación cuando se llama a pause', () => {
    // Arrange
    component.play(); // Iniciamos la animación primero
    expect(component.isAnimationPlaying()).toBeTrue();
    
    // Act
    component.pause();
    
    // Assert
    expect(animationSpy.pause).toHaveBeenCalled();
    expect(component.isAnimationPaused()).toBeTrue();
  });

  it('should detener correctamente la animación cuando se llama a stop', () => {
    // Arrange
    component.play(); // Iniciamos la animación primero
    expect(component.isAnimationPlaying()).toBeTrue();
    
    // Act
    component.stop();
    
    // Assert
    expect(animationSpy.stop).toHaveBeenCalled();
    expect(component.isAnimationStopped()).toBeTrue();
  });
});
