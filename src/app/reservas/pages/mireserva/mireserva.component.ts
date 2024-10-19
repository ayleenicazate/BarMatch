import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../services/reservaService/reserva.service';

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
    private route: ActivatedRoute, 
    private router: Router,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    
    // Obtener los datos de la reserva del servicio
    this.reserva = this.reservaService.getReservaData();

    // Si no hay datos en el servicio, intenta obtenerlos de los parámetros de la ruta
    if (Object.keys(this.reserva).length === 0) {
      this.reserva = {
        deporte: this.route.snapshot.paramMap.get('deporte') || '',
        fecha: this.route.snapshot.paramMap.get('fecha') || '',
        barNombre: this.route.snapshot.paramMap.get('barNombre') || '',
        encuentroNombre: this.route.snapshot.paramMap.get('encuentroNombre') || '',
        cantidadPersonas: Number(this.route.snapshot.paramMap.get('cantidadPersonas')) || 0,
        barDireccion: this.route.snapshot.paramMap.get('barDireccion') || ''
      };
    }
  }

  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home'],);
    }, 1500);

  }

  goToReserva() {
    this.router.navigate(['/reservas/mireserva', {
      username: this.route.snapshot.paramMap.get('username') || '',
      fecha: this.route.snapshot.paramMap.get('fecha') || '',
      barNombre: this.route.snapshot.paramMap.get('barNombre') || '',
      encuentroNombre: this.route.snapshot.paramMap.get('encuentroNombre') || '',
      cantidadPersonas: Number(this.route.snapshot.paramMap.get('cantidadPersonas')) || 0,
      barDireccion: this.route.snapshot.paramMap.get('barDireccion') || ''
    }]);
  }

  goToMisReservas() {
    this.router.navigate(['/reservas', { username: this.username }]);
  }
}
