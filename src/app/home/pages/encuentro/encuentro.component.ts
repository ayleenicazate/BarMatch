import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


interface Encuentro {
  id: number;
  deporte: string;
  fecha: string;
  nombre: string;

}


@Component({
  selector: 'app-encuentro',
  templateUrl: './encuentro.component.html',
  styleUrls: ['./encuentro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EncuentroComponent implements OnInit {
  username: string = '';
  deporteSeleccionado: string = '';
  fechaSeleccionada: string = '';
  encuentros: Encuentro[] = [];


  todosLosEncuentros: Encuentro[] = [
    
      { id: 1, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Manchester United vs. Liverpool' },
      { id: 2, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Barcelona vs. Real Madrid' },
      { id: 3, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Bayern Munich vs. Borussia Dortmund' },
      { id: 4, deporte: 'Baloncesto', fecha: '15-11-2024', nombre: 'Lakers vs. Celtics' },
      { id: 5, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Federer vs. Nadal' },
      { id: 6, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'Chelsea vs. Arsenal' },
      { id: 7, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Warriors vs. Heat' },
      { id: 8, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Djokovic vs. Thiem' },
      { id: 9, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'PSG vs. Marseille' },
      { id: 10, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Nets vs. Bucks' },
      { id: 11, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Juventus vs. Inter de Milán' },
      { id: 12, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Atlético de Madrid vs. Sevilla' },
      { id: 13, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Raptors vs. Mavericks' },
      { id: 14, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Bulls vs. Suns' },
      { id: 15, deporte: 'Tenis', fecha: '17-11-2024', nombre: 'Zverev vs. Medvedev' },
      { id: 16, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Tsitsipas vs. Rublev' },
      { id: 17, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Napoli vs. Roma' },
      { id: 18, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Ajax vs. Feyenoord' },
      { id: 19, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: '76ers vs. Clippers' },
      { id: 20, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Alcaraz vs. Sinner' },
      { id: 21, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Colo Colo vs. Universidad de Chile' },
      { id: 22, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Universidad Católica vs. Unión Española' },
      { id: 23, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'O\'Higgins vs. Palestino' },
      { id: 24, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Huachipato vs. Cobresal' },
      { id: 25, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Everton vs. Audax Italiano' },
      { id: 26, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Jarry vs. Schwartzman' },
      { id: 27, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Garin vs. Del Potro' },
      { id: 28, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Celtics vs. Heat' },
      { id: 29, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Curicó Unido vs. Coquimbo Unido' },
      { id: 30, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Tabilo vs. Bautista Agut' },
      { id: 31, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Everton vs. West Ham' },
{ id: 32, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Real Betis vs. Valencia' },
{ id: 33, deporte: 'Baloncesto', fecha: '15-11-2024', nombre: 'Knicks vs. Raptors' },
{ id: 34, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Murray vs. Nishikori' },
{ id: 35, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Tottenham vs. Leicester City' },
{ id: 36, deporte: 'Baloncesto', fecha: '16-11-2024', nombre: 'Spurs vs. Pelicans' },
{ id: 37, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'Crystal Palace vs. Southampton' },
{ id: 38, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Jazz vs. Nuggets' },
{ id: 39, deporte: 'Tenis', fecha: '17-11-2024', nombre: 'Raonic vs. Monfils' },
{ id: 40, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Brighton vs. Aston Villa' },
{ id: 41, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Alavés vs. Osasuna' },
{ id: 42, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Pacers vs. Grizzlies' },
{ id: 43, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Shapovalov vs. Hurkacz' },
{ id: 44, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Lazio vs. Fiorentina' },
{ id: 45, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Kings vs. Pistons' },
{ id: 46, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Kyrgios vs. Wawrinka' },
{ id: 47, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Sassuolo vs. Bologna' },
{ id: 48, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Magic vs. Trail Blazers' },
{ id: 49, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Isner vs. Fritz' },
{ id: 50, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Leeds United vs. Wolverhampton' },
{ id: 51, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Mallorca vs. Getafe' },
{ id: 52, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Rockets vs. Hornets' },
{ id: 53, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Dimitrov vs. Fognini' },
{ id: 54, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Burnley vs. Sheffield United' },
{ id: 55, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Wizards vs. Hawks' },
{ id: 56, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Schwartzman vs. Tiafoe' },
{ id: 57, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Celta de Vigo vs. Espanyol' },
{ id: 58, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Real Sociedad vs. Granada' },
{ id: 59, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Timberwolves vs. Thunder' },
{ id: 60, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Carreno Busta vs. Ruud' },


    
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.deporteSeleccionado = this.route.snapshot.paramMap.get('deporte') || '';
    this.fechaSeleccionada = this.route.snapshot.paramMap.get('fecha') || '';

    this.encuentros = this.todosLosEncuentros.filter(e => 
      e.deporte.toLowerCase() === this.deporteSeleccionado.toLowerCase() && e.fecha === this.fechaSeleccionada
    );
  }

  seleccionarEncuentro(encuentro: Encuentro) {
    this.router.navigate(['/home/bar', {
      username: this.username,
      encuentroId: encuentro.id,
      encuentroNombre: encuentro.nombre,
      deporte: encuentro.deporte,
      fecha: encuentro.fecha
    }]);
  }

  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home', {username: this.username}]);
    }, 1500);
  }

  goToCalendar() {
      this.router.navigate(['/home/calendar', {username: this.username, deporte: this.deporteSeleccionado}]);
  }
}
