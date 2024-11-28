import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private sqliteService: SqliteService
  ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
  }

  // Este método se ejecuta cada vez que la página se muestra
  ionViewWillEnter() {
    this.loadReservas();
  }

  // Método separado para cargar las reservas
  async loadReservas() {
    try {
      const result = await this.sqliteService.getReservasByUsername(this.username);
      console.log('Resultado de getReservasByUsername:', result);
      
      if (result && result.length > 0) {
        this.reservas = result;
        console.log('Reservas cargadas:', this.reservas);
      } else {
        console.log('No se encontraron reservas');
        this.reservas = [];
      }
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      this.reservas = [];
    }
  }

  goToHome() {
    this.router.navigate(['/home', { username: this.username }]);
  }

  goToReserva(reserva: any) {
    this.router.navigate(['/reservas/mireserva', {
      reserva_id: reserva.reserva_id,
      username: this.username,
      deporte: reserva.deporte,
      fecha: reserva.fecha,
      barNombre: reserva.barNombre,
      encuentroNombre: reserva.encuentroNombre,
      cantidad_personas: reserva.cantidad_personas,
      barDireccion: reserva.barDireccion,
      fecha_reserva: reserva.fecha_reserva
    }]);
  }
}
