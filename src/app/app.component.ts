import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ReservaService } from './services/reserva.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';
  password: string = '';
  deporte: string = '';
  fecha: string = '';
  barNombre: string = '';
  encuentroNombre: string = '';
  cantidadPersonas: number = 0;
  barDireccion: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    // Suscribirse a los eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUsernameFromRoute();
    });

    this.updateUsernameFromRoute();
  }

  updateUsernameFromRoute() {
    const userData = this.reservaService.getUserData();
    if (userData && userData.username) {
      this.username = userData.username;
    } else {
      this.username = this.route.snapshot.paramMap.get('username') || '';
      if (this.username) {
        this.reservaService.setUserData({ username: this.username });
      }
    }
  }

  navigateTo(page: string) {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      const reservaData = this.reservaService.getReservaData();
      const navigationExtras = { ...reservaData, username: this.username };
      
      switch (page) {
        case 'home':
          this.router.navigate(['/home', navigationExtras]);
          break;
        case 'reservas':
          this.router.navigate(['/reservas', navigationExtras]);
          break;
        case 'login':
          this.router.navigate(['/login']);
          break;
        default:
          this.router.navigate([`/${page}`, navigationExtras]);
      }
    }, 1500);
    this.menuCtrl.close();
  }

  logout() {
    this.username = '';
    this.reservaService.clearAllData(); // Asegúrate de que este método exista en ReservaService
    this.router.navigate(['/login']);
    this.menuCtrl.close();
  }

  setUsername(username: string) {
    this.username = username;
    this.reservaService.setUserData({ username: username });
  }

  clearFields() {
    this.username = '';
    this.password = '';
  }
}
