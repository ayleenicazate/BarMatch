import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute, 
    private router: Router,
    private sqlite: SqliteService
  ) { }

  async ngOnInit() {
    // Obtener parámetros de la ruta
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.deporte = this.route.snapshot.paramMap.get('deporte') || '';
    this.fecha = this.route.snapshot.paramMap.get('fecha') || '';
    this.barNombre = this.route.snapshot.paramMap.get('barNombre') || '';
    this.encuentroNombre = this.route.snapshot.paramMap.get('encuentroNombre') || '';
    this.cantidad_personas = Number(this.route.snapshot.paramMap.get('cantidad_personas'));
    this.barDireccion = this.route.snapshot.paramMap.get('barDireccion') || '';
    this.encuentro_id = Number(this.route.snapshot.paramMap.get('encuentro_id'));
    this.bar_id = Number(this.route.snapshot.paramMap.get('bar_id'));

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
      console.log('Reserva guardada exitosamente', result);

    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  }

  goToHome() {
    this.router.navigate(['/home', { username: this.username }]);
  }
  
  goToMisReservas() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/reservas', { username: this.username }]);
    }, 1500);
  }
}
