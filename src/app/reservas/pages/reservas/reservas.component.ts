import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../services/reservaService/reserva.service';

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
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    if (!this.username) {
      const userData = this.reservaService.getUserData();
      this.username = userData?.username || '';
    }
    
    const reservaData = this.reservaService.getReservaData();
    if (Object.keys(reservaData).length > 0) {
      this.reservas.push(reservaData);
    }

    // Si no hay datos en el servicio, intenta obtenerlos de los parámetros de la ruta
    if (this.reservas.length === 0) {
      const nuevaReserva = {
        deporte: this.route.snapshot.paramMap.get('deporte') || '',
        fecha: this.route.snapshot.paramMap.get('fecha') || '',
        barNombre: this.route.snapshot.paramMap.get('barNombre') || '',
        encuentroNombre: this.route.snapshot.paramMap.get('encuentroNombre') || '',
        cantidadPersonas: Number(this.route.snapshot.paramMap.get('cantidadPersonas')) || 0,
        barDireccion: this.route.snapshot.paramMap.get('barDireccion') || ''
      };

      if (Object.values(nuevaReserva).every(value => value !== '' && value !== 0)) {
        this.reservas.push(nuevaReserva);
        this.reservaService.setReservaData(nuevaReserva);
      }
    }
  }

  goToHome() {
    this.router.navigate(['/home', { username: this.username }]);
  }

  goToReserva(reserva: any) {
    this.router.navigate(['/reservas/mireserva', {
      username: this.username,
      deporte: this.route.snapshot.paramMap.get('deporte') || '',
      fecha: this.route.snapshot.paramMap.get('fecha') || '',
      barNombre: this.route.snapshot.paramMap.get('barNombre') || '',
      encuentroNombre: this.route.snapshot.paramMap.get('encuentroNombre') || '',
      cantidadPersonas: Number(this.route.snapshot.paramMap.get('cantidadPersonas')) || 0,
      barDireccion: this.route.snapshot.paramMap.get('barDireccion') || '',
      ...reserva
    }]);
  }
}
