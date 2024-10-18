import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Bar {
  id: number;
  nombre: string;
  direccion: string;
}

interface EncuentroBar {
  id: number;
  encuentroId: number;
  barId: number;
}

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BarComponent implements OnInit {
  username: string = '';
  encuentroId: number = 0;
  encuentroNombre: string = '';
  deporte: string = '';
  fecha: string = '';
  bares: Bar[] = [];

  todosBares: Bar[] = [
    { id: 1, nombre: "El Rincón Futbolero", direccion: "Las Condes 1020" },
    { id: 2, nombre: "Sports Bar", direccion: "Calle Principal 123" },
    { id: 3, nombre: "Golazo Bar", direccion: "Vitacura 777" },
    { id: 4, nombre: "Champions", direccion: "Paseo de la Victoria 654" },
    { id: 5, nombre: "The Dugout", direccion: "Avenida Central 456" },
    { id: 6, nombre: "Básquet Lounge", direccion: "Providencia 333" },
    { id: 7, nombre: "La Pelota Loca", direccion: "La Florida 902" },
    { id: 8, nombre: "MatchPoint", direccion: "Ñuñoa 451" },
    { id: 9, nombre: "The Sideline", direccion: "Calle del Estadio 321" },
    { id: 10, nombre: "Overtime", direccion: "Plaza Mayor 789" },
  ];
  

encuentroBares: EncuentroBar[] = [
  { id: 1, encuentroId: 1, barId: 1 },
  { id: 2, encuentroId: 1, barId: 2 },
  { id: 3, encuentroId: 1, barId: 3 },
  { id: 4, encuentroId: 2, barId: 2 },
  { id: 5, encuentroId: 2, barId: 4 },
  { id: 6, encuentroId: 3, barId: 1 },
  { id: 7, encuentroId: 3, barId: 3 },
  { id: 8, encuentroId: 3, barId: 5 },
  { id: 9, encuentroId: 4, barId: 6 },
  { id: 10, encuentroId: 4, barId: 1 },
  { id: 11, encuentroId: 5, barId: 8 },
  { id: 12, encuentroId: 6, barId: 9 },
  { id: 13, encuentroId: 7, barId: 7 },
  { id: 14, encuentroId: 8, barId: 8 },
  { id: 15, encuentroId: 9, barId: 5 },
  { id: 16, encuentroId: 10, barId: 7 },
  { id: 17, encuentroId: 11, barId: 9 },
  { id: 18, encuentroId: 12, barId: 6 },
  { id: 19, encuentroId: 13, barId: 3 },
  { id: 20, encuentroId: 14, barId: 10 },
  { id: 21, encuentroId: 15, barId: 8 },
  { id: 22, encuentroId: 16, barId: 10 },
  { id: 23, encuentroId: 17, barId: 9 },
  { id: 24, encuentroId: 18, barId: 6 },
  { id: 25, encuentroId: 19, barId: 5 },
  { id: 26, encuentroId: 20, barId: 8 },
  { id: 27, encuentroId: 21, barId: 10 },
  { id: 28, encuentroId: 22, barId: 7 },
  { id: 29, encuentroId: 23, barId: 6 },
  { id: 30, encuentroId: 24, barId: 9 },
  { id: 31, encuentroId: 25, barId: 4 },
  { id: 32, encuentroId: 26, barId: 8 },
  { id: 33, encuentroId: 27, barId: 6 },
  { id: 34, encuentroId: 28, barId: 7 },
  { id: 35, encuentroId: 29, barId: 9 },
  { id: 36, encuentroId: 30, barId: 10 },
];


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.encuentroId = Number(this.route.snapshot.paramMap.get('encuentroId')) || 0;
    this.encuentroNombre = this.route.snapshot.paramMap.get('encuentroNombre') || '';
    this.deporte = this.route.snapshot.paramMap.get('deporte') || '';
    this.fecha = this.route.snapshot.paramMap.get('fecha') || '';

    this.cargarBares();
  }

  cargarBares() {
    const baresDelEncuentro = this.encuentroBares
      .filter(eb => eb.encuentroId === this.encuentroId)
      .map(eb => eb.barId);

    this.bares = this.todosBares.filter(bar => baresDelEncuentro.includes(bar.id));
  }

  seleccionarBar(bar: Bar) {
    console.log('Bar seleccionado:', bar);
    this.router.navigate(['/home/cantpers', {
      username: this.username,
      barId: bar.id,
      barNombre: bar.nombre,
      encuentroNombre: this.encuentroNombre,
      fecha: this.fecha
    }]);
  }

  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home', {username: this.username}]);
    }, 1500);
  }

  goToEncuentros() {
      this.router.navigate(['/home/encuentros', {
        username: this.username,
        fecha: this.fecha,
        deporte: this.deporte
      }]);
  }
}
    
