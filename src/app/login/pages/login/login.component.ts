import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ReservaService } from 'src/app/services/reservaService/reserva.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private appComponent: AppComponent,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  clearFields() {
    this.username = '';
    this.password = '';
    
  }

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      async (response) => {
        if (response.success) {
          console.log('Login exitoso');
          localStorage.setItem('authToken', response.token);
          const currentUser = this.authService.getCurrentUser();
          console.log('Usuario actual:', currentUser);
          this.router.navigate(['/loading']);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);  
        } else {
          console.error('Error en el login:', response.message);
          await this.mostrarAlertaCredencialesIncorrectas();
        }
      },
      async (error) => {
        console.error('Error en el login', error);
        await this.mostrarAlertaCredencialesIncorrectas();
      }
    );
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
  }

}
