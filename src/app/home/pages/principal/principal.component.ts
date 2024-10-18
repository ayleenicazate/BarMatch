import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/pages/login/login.component';

interface Deporte {
  nombre: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, LoginComponent]
})
export class PrincipalComponent  implements OnInit {
  username: String='';
  deportes: Deporte[] = [
    {nombre:'Futbol', descripcion:'Champions League, Libertadores, Campeonato nacional y todo el fútbol que buscas en compañía de nuevos amigos.', imagen:'assets/login1.png'},
    {nombre:'Baloncesto', descripcion:'   NBA, Euroliga, LBN Chile y toda la emoción del baloncesto que buscas en compañía de nuevos nuevos amigos.', imagen:'assets/login1.png'},
    {nombre:'Tenis', descripcion:'Wimbledon, Roland Garros, US Open, Australian Open y todos los torneos de tenis que te apasionan en compañía de nuevos amigos.', imagen:'assets/login1.png'},
  ];

  constructor(private route:ActivatedRoute, private router:Router ){}

  ngOnInit() {
    
    this.username = this.route.snapshot.paramMap.get('username')||'' ;
  }

  goToCalendar(deporte: string) {
    this.router.navigate(['home/calendar', { deporte: deporte, username: this.username }]);
  }
  goToLogin() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/login',]);
    },1500);
  }
  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home',{username: this.username}]);
    },1500);
  }

}