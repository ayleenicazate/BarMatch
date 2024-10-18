import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  cantidadPersonas: number = 1;
  barNombre: string='';
  barDireccion: string='';
  encuentroNombre: string='';

  constructor(private route:ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')||'';
    this.deporte = this.route.snapshot.paramMap.get('deporte')||'';
    this.fecha = this.route.snapshot.paramMap.get('fecha')||'';
    this.barNombre = this.route.snapshot.paramMap.get('barNombre')||'';
    this.barDireccion = this.route.snapshot.paramMap.get('barDireccion')||'';
    this.encuentroNombre = this.route.snapshot.paramMap.get('encuentroNombre')||'';
  }

  goToConfirmacion() {
    this.router.navigate(['/home/confirmacion', {
      username: this.username,
      deporte: this.deporte,
      fecha: this.fecha,
      barNombre: this.barNombre,
      barDireccion: this.barDireccion,
      encuentroNombre: this.encuentroNombre,
      cantidadPersonas: this.cantidadPersonas
    }]);
  }

  goToHome() {
      this.router.navigate(['/home',{username:this.username}]);
  }
}
