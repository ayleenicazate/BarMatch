import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  navigateTo(page: string) {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      if (page === 'home') {
        this.router.navigate([`/${page}`, {username: this.username }]);
      } else {
        this.router.navigate([`/${page}`, {username: this.username}]);
      }
    }, 1500);
    this.menuCtrl.close();
  }

  logout() {
    // Implementa aquí la lógica de cierre de sesión
    this.username = '';
    this.router.navigate(['/login']);
    this.menuCtrl.close();
  }

  setUsername(username: string) {
    this.username = username;
  }
}
