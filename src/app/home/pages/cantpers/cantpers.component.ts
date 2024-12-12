import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cantpers',
  templateUrl: './cantpers.component.html',
  styleUrls: ['./cantpers.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CantpersComponent  implements OnInit {
  username: string='';
  deporte: string='';
  fecha: string='';
  cantidad_personas: number | null = null;
  bar_id: number = 0;
  barNombre: string='';
  barDireccion: string='';
  encuentro_id: number = 0;
  encuentroNombre: string='';
  
  constructor(private route:ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    const state = history.state;
    if (state) {
      this.username = state.username;
      this.deporte = state.deporte;
      this.fecha = state.fecha;
      this.barNombre = state.barNombre;
      this.bar_id = state.bar_id;
      this.barDireccion = state.barDireccion;
      this.encuentro_id = state.encuentro_id;
      this.encuentroNombre = state.encuentroNombre;
    }
  }

  puedeConfirmar(): boolean {
    return this.cantidad_personas !== null && this.cantidad_personas > 0;
  }

  goToConfirmacion() {
    if (this.puedeConfirmar()) {
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.username,
          deporte: this.deporte,
          fecha: this.fecha,
          bar_id: this.bar_id,
          barNombre: this.barNombre,
          barDireccion: this.barDireccion,
          encuentro_id: this.encuentro_id,
          encuentroNombre: this.encuentroNombre,
          cantidad_personas: this.cantidad_personas
        }
      };

      this.router.navigate(['/home/confirmacion'], navigationExtras);
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
}
