import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guard/auth.guard';

import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader'
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';



jeepSqlite(window)


@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent, 
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [TabBarComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
