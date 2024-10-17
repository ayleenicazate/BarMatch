import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadComponent } from './pages/load/load.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LoadingRoutingModule,
    IonicModule,
    LoadComponent
  ]
})
export class LoadingModule { }
