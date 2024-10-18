import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EncuentroComponent } from './pages/encuentro/encuentro.component';
import { BarComponent } from './pages/bar/bar.component';
import { CantpersComponent } from './pages/cantpers/cantpers.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';


const routes: Routes = [
 {
  path: '',
  component: PrincipalComponent
 },
 {
  path:'calendar',
  component: CalendarComponent
 },
 {
  path:'encuentros',
  component: EncuentroComponent
 },
 {
  path:'bar',
  component: BarComponent
 },
 {
  path: 'cantpers',
  component: CantpersComponent
 },
 {
  path: 'confirmacion',
  component:ConfirmacionComponent
 }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
