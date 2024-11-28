import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../../../app.component';

import { RecuperarPassComponent } from './recuperar-pass.component';

describe('RecuperarPassComponent', () => {
  let component: RecuperarPassComponent;
  let fixture: ComponentFixture<RecuperarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        RecuperarPassComponent
      ],
      providers: [
        { provide: AppComponent, useValue: {} } // Mock del AppComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
