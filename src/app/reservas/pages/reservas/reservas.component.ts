import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ReservasComponent implements OnInit {
  username: string = '';
  reservas: any[] = [];

  constructor(
    private router: Router,
    private sqliteService: SqliteService
  ) { }

  ngOnInit() {
    // Recuperar username del history state
    const state = history.state;
    if (state) {
      this.username = state.username;
    }
  }

  ionViewWillEnter() {
    this.loadReservas();
  }

  async loadReservas() {
    try {
      const result = await this.sqliteService.getReservasByUsername(this.username);
      if (result && result.length > 0) {
        this.reservas = result;
      } else {
        this.reservas = [];
      }
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      this.reservas = [];
    }
  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username
      }
    };

    this.router.navigate(['/home'], navigationExtras);
  }

  goToReserva(reserva: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
        deporte: reserva.deporte,
        fecha: reserva.fecha,
        barNombre: reserva.barNombre,
        encuentroNombre: reserva.encuentroNombre,
        cantidad_personas: reserva.cantidad_personas,
        barDireccion: reserva.barDireccion
      }
    };

    this.router.navigate(['/reservas/mireserva'], navigationExtras);
  }
}
