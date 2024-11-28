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
  cantidad_personas: number = 0;
  bar_id: number = 0;
  barNombre: string='';
  barDireccion: string='';
  encuentro_id: number = 0;
  encuentroNombre: string='';
  
  constructor(private route:ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')||'';
    this.deporte = this.route.snapshot.paramMap.get('deporte')||'';
    this.fecha = this.route.snapshot.paramMap.get('fecha')||'';
    this.barNombre = this.route.snapshot.paramMap.get('barNombre')||'';
    this.bar_id = Number(this.route.snapshot.paramMap.get('bar_id'));
    this.barDireccion = this.route.snapshot.paramMap.get('barDireccion')||'';
    this.encuentro_id = Number(this.route.snapshot.paramMap.get('encuentro_id'));
    this.encuentroNombre = this.route.snapshot.paramMap.get('encuentroNombre')||'';
    
  }

  goToConfirmacion() {
    this.router.navigate(['/home/confirmacion', {
      username: this.username,
      deporte: this.deporte,
      fecha: this.fecha,
      bar_id: this.bar_id,
      barNombre: this.barNombre,
      barDireccion: this.barDireccion,
      encuentro_id: this.encuentro_id,
      encuentroNombre: this.encuentroNombre,
      cantidad_personas: this.cantidad_personas
    }]);
  }

  goToHome() {
      this.router.navigate(['/home',{username:this.username}]);
  }
}
