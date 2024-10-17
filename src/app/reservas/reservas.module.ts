import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { IonicModule } from '@ionic/angular';
import { MireservaComponent } from './pages/mireserva/mireserva.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    IonicModule,
    MireservaComponent
  ]
})
export class ReservasModule { }
