import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';
import { SqliteService } from 'src/app/services/sqliteService/sqlite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  private authSubscription?: Subscription;

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private appComponent: AppComponent,
    private authService: AuthService,
    private sqliteService: SqliteService
  ) {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.resetForm();
      }
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  resetForm() {
    this.username = '';
    this.password = '';
  }

  async login() {
    if (!this.username || !this.password) {
      await this.showAlert('Error', 'Por favor ingrese usuario y contraseña');
      return;
    }

    try {
      const result = await this.authService.login({
        username: this.username,
        password: this.password
      });
      
      if (result.success) {
        const redirectUrl = '/home';
        this.router.navigate(['/loading']).then(() => {
          setTimeout(() => {
            this.router.navigate([redirectUrl]);
          }, 1500);
        });
      } else {
        await this.showAlert('Error', result.message);
        this.resetForm();
      }
    } catch (error) {
      console.error('Error en el login:', error);
      await this.showAlert('Error', 'Error al intentar iniciar sesión');
      this.resetForm();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaCredencialesIncorrectas() {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToRecuperarPass() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/login/recuperar-pass']);
    }, 1500);
    this.resetForm();
  }
}
