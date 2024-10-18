import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private appComponent: AppComponent,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
  }

  clearFields() {
    this.username = '';
    this.password = '';
    this.reservaService.clearUserData();
  }

  login() {
    const validUser = 'víctor';
    const validPassword = '1234';

    if (this.username === validUser && this.password === validPassword) {
      this.showAlert('Bienvenido, ' + this.username + '!', 'Has ingresado correctamente.');
      
      this.router.navigate(['/loading']);
      setTimeout(() => {
        this.router.navigate(['/home', { username: this.username }]);    
      }, 1500);
    } else {
      this.showAlert('Error de Inicio de Sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
      this.clearFields();
    }
  }

  goToRecuperarPass() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/login/recuperar-pass']);
    }, 1500);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
