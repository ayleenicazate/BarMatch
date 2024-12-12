import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mireserva',
  templateUrl: './mireserva.component.html',
  styleUrls: ['./mireserva.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})

export class MireservaComponent implements OnInit {
  username: string = '';
  reserva: any = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Recuperar datos del history state
    const state = history.state;
    if (state) {
      this.username = state.username;
      this.reserva = {
        deporte: state.deporte,
        fecha: state.fecha,
        barNombre: state.barNombre,
        encuentroNombre: state.encuentroNombre,
        cantidad_personas: state.cantidad_personas,
        barDireccion: state.barDireccion
      };
    }
  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username
      }
    };

    this.router.navigate(['/loading']).then(() => {
      setTimeout(() => {
        this.router.navigate(['/home'], navigationExtras);
      }, 1500);
    });
  }



  goToMisReservas() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username
      }
    };

    this.router.navigate(['/reservas'], navigationExtras);
  }
}
