import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ConfirmacionComponent implements OnInit {
  username: string = '';
  deporte: string = '';
  fecha: string = '';
  barNombre: string = '';
  encuentroNombre: string = '';
  cantidad_personas: number = 0;
  barDireccion: string = '';
  encuentro_id: number = 0;
  bar_id: number = 0;

  constructor(
    private router: Router,
    private sqlite: SqliteService
  ) { }

  async ngOnInit() {
    // Recuperar datos del history state
    const state = history.state;
    if (state) {
      this.username = state.username;
      this.deporte = state.deporte;
      this.fecha = state.fecha;
      this.barNombre = state.barNombre;
      this.encuentroNombre = state.encuentroNombre;
      this.cantidad_personas = state.cantidad_personas;
      this.barDireccion = state.barDireccion;
      this.encuentro_id = state.encuentro_id;
      this.bar_id = state.bar_id;
    }

    await this.confirmarReserva();
  }
  
  async confirmarReserva() {
    try {
      const reservaData = {
        username: this.username,
        encuentro_id: this.encuentro_id,
        bar_id: this.bar_id,
        cantidad_personas: this.cantidad_personas,
        fecha_reserva: new Date().toISOString(),
        deporte: this.deporte,
        fecha: this.fecha,
        encuentroNombre: this.encuentroNombre,
        barNombre: this.barNombre,
        barDireccion: this.barDireccion
      };
      const result = await this.sqlite.createReserva(reservaData);
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
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
  
  goToMisReservas() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username
      }
    };

    this.router.navigate(['/loading']).then(() => {
      setTimeout(() => {
        this.router.navigate(['/reservas'], navigationExtras);
      }, 1500);
    });
  }
}
