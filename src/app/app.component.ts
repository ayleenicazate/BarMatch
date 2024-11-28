import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { Device } from '@capacitor/device';
import { SqliteService } from './services/sqliteService/sqlite.service';
import { AuthService } from './services/authService/auth.service';
import { AvatarService } from './services/apiService/api.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {

  public isWeb: boolean;
  public load: boolean;
  public avatarUrl: string = '';

  username: string = '';


  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private route: ActivatedRoute,


    private platform: Platform,
    private sqlite: SqliteService,
    private authService: AuthService,
    private avatarService: AvatarService
  ) 
  {
    this.isWeb = false;
    this.load = false;
    this.initApp();
  }

  initApp(){

    this.platform.ready().then( async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';

      this.sqlite.init();
      this.sqlite.dbReady.subscribe(load => {
        this.load = load;
      })

      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.username = currentUser.username;
        this.avatarUrl = this.avatarService.getAvatar(this.username);
      }

      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          const user = this.authService.getCurrentUser();
          if (user) {
            this.username = user.username;
            this.avatarUrl = this.avatarService.getAvatar(this.username);
          }
        }
      });
    })

  }


  navigateTo(page: string) {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      const currentUser = this.authService.getCurrentUser();
      const navigationExtras = currentUser ? { username: currentUser.username } : {};
      
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
    this.authService.logout();
    this.menuCtrl.close();
  }


}
