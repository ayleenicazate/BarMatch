import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then(m => m.LoadingModule),
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then(m => m.ReservasModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
