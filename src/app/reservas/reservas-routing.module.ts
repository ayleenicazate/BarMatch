import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { MireservaComponent } from './pages/mireserva/mireserva.component';

const routes: Routes = [
  {
    path:'',
    component: ReservasComponent
  },
  {
    path:'mireserva',
    component: MireservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
