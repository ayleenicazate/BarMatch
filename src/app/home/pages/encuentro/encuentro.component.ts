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
    
      { id: 1, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Manchester United v/s Liverpool' },
      { id: 2, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Barcelona v/s Real Madrid' },
      { id: 3, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Bayern Munich v/s Borussia Dortmund' },
      { id: 4, deporte: 'Baloncesto', fecha: '15-11-2024', nombre: 'Lakers v/s Celtics' },
      { id: 5, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Federer v/s Nadal' },
      { id: 6, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'Chelsea v/s Arsenal' },
      { id: 7, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Warriors v/s Heat' },
      { id: 8, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Djokovic v/s Thiem' },
      { id: 9, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'PSG v/s Marseille' },
      { id: 10, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Nets v/s Bucks' },
      { id: 11, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Juventus v/s Inter de Milán' },
      { id: 12, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Atlético de Madrid v/s Sevilla' },
      { id: 13, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Raptors v/s Mavericks' },
      { id: 14, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Bulls v/s Suns' },
      { id: 15, deporte: 'Tenis', fecha: '17-11-2024', nombre: 'Zverev v/s Medvedev' },
      { id: 16, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Tsitsipas v/s Rublev' },
      { id: 17, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Napoli v/s Roma' },
      { id: 18, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Ajax v/s Feyenoord' },
      { id: 19, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: '76ers v/s Clippers' },
      { id: 20, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Alcaraz v/s Sinner' },
      { id: 21, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Colo Colo v/s Universidad de Chile' },
      { id: 22, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Universidad Católica v/s Unión Española' },
      { id: 23, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'O\'Higgins v/s Palestino' },
      { id: 24, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Huachipato v/s Cobresal' },
      { id: 25, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Everton v/s Audax Italiano' },
      { id: 26, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Jarry v/s Schwartzman' },
      { id: 27, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Garin v/s Del Potro' },
      { id: 28, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Celtics v/s Heat' },
      { id: 29, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Curicó Unido v/s Coquimbo Unido' },
      { id: 30, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Tabilo v/s Bautista Agut' },
      { id: 31, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Everton v/s West Ham' },
      { id: 32, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Real Betis v/s Valencia' },
      { id: 33, deporte: 'Baloncesto', fecha: '15-11-2024', nombre: 'Knicks v/s Raptors' },
      { id: 34, deporte: 'Tenis', fecha: '16-11-2024', nombre: 'Murray v/s Nishikori' },
      { id: 35, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Tottenham v/s Leicester City' },
      { id: 36, deporte: 'Baloncesto', fecha: '16-11-2024', nombre: 'Spurs v/s Pelicans' },
      { id: 37, deporte: 'Futbol', fecha: '17-11-2024', nombre: 'Crystal Palace v/s Southampton' },
      { id: 38, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Jazz v/s Nuggets' },
      { id: 39, deporte: 'Tenis', fecha: '17-11-2024', nombre: 'Raonic v/s Monfils' },
      { id: 40, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Brighton v/s Aston Villa' },
      { id: 41, deporte: 'Futbol', fecha: '18-11-2024', nombre: 'Alavés v/s Osasuna' },
      { id: 42, deporte: 'Baloncesto', fecha: '18-11-2024', nombre: 'Pacers v/s Grizzlies' },
      { id: 43, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Shapovalov v/s Hurkacz' },
      { id: 44, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Lazio v/s Fiorentina' },
      { id: 45, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Kings v/s Pistons' },
      { id: 46, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Kyrgios v/s Wawrinka' },
      { id: 47, deporte: 'Futbol', fecha: '19-11-2024', nombre: 'Sassuolo v/s Bologna' },
      { id: 48, deporte: 'Baloncesto', fecha: '19-11-2024', nombre: 'Magic v/s Trail Blazers' },
      { id: 49, deporte: 'Tenis', fecha: '19-11-2024', nombre: 'Isner v/s Fritz' },
      { id: 50, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Leeds United v/s Wolverhampton' },
      { id: 51, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Mallorca v/s Getafe' },
      { id: 52, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Rockets v/s Hornets' },
      { id: 53, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Dimitrov v/s Fognini' },
      { id: 54, deporte: 'Futbol', fecha: '20-11-2024', nombre: 'Burnley v/s Sheffield United' },
      { id: 55, deporte: 'Baloncesto', fecha: '20-11-2024', nombre: 'Wizards v/s Hawks' },
      { id: 56, deporte: 'Tenis', fecha: '20-11-2024', nombre: 'Schwartzman v/s Tiafoe' },
      { id: 57, deporte: 'Futbol', fecha: '15-11-2024', nombre: 'Celta de Vigo v/s Espanyol' },
      { id: 58, deporte: 'Futbol', fecha: '16-11-2024', nombre: 'Real Sociedad v/s Granada' },
      { id: 59, deporte: 'Baloncesto', fecha: '17-11-2024', nombre: 'Timberwolves v/s Thunder' },
      { id: 60, deporte: 'Tenis', fecha: '18-11-2024', nombre: 'Carreno Busta v/s Ruud' },


    
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
