import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReservaService } from '../../../services/reservaService/reserva.service';

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
  cantidadPersonas: number = 0;
  barDireccion: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private reservaService: ReservaService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.deporte = this.route.snapshot.paramMap.get('deporte') || '';
    this.fecha = this.route.snapshot.paramMap.get('fecha') || '';
    this.barNombre = this.route.snapshot.paramMap.get('barNombre') || '';
    this.encuentroNombre = this.route.snapshot.paramMap.get('encuentroNombre') || '';
    this.cantidadPersonas = Number(this.route.snapshot.paramMap.get('cantidadPersonas')) || 0;
    this.barDireccion = this.route.snapshot.paramMap.get('barDireccion') || '';

    // Guardar los datos de la reserva en el servicio
    this.confirmarReserva();
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

  confirmarReserva() {
    const nuevaReserva = {
      deporte: this.deporte,
      fecha: this.fecha,
      barNombre: this.barNombre,
      encuentroNombre: this.encuentroNombre,
      cantidadPersonas: this.cantidadPersonas,
      barDireccion: this.barDireccion
    };
    this.reservaService.setReservaData(nuevaReserva);
  }
}
