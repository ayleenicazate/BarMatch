import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { IonicModule } from '@ionic/angular';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EncuentroComponent } from './pages/encuentro/encuentro.component';
import { BarComponent } from './pages/bar/bar.component';
import { CantpersComponent } from './pages/cantpers/cantpers.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
// import { TabBarComponent } from './components/tab-bar/tab-bar.component'; // ajusta el path si es necesario


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    PrincipalComponent,
    CalendarComponent,
    EncuentroComponent,
    BarComponent,
    CantpersComponent,
    ConfirmacionComponent,
  ]
})
export class HomeModule { }
