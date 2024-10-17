import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarPassComponent } from './pages/recuperar-pass/recuperar-pass.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },
  {
    path:'recuperar-pass',
    component: RecuperarPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
