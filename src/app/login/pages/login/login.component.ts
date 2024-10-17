import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})


export class LoginComponent implements AfterViewInit {
  username: string = '';
  password: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  ngAfterViewInit() {}
    
    login() {
      const validUser = 'víctor';
      const validPassword = '1234';
  
      if (this.username === validUser && this.password === validPassword) {
        this.showAlert('Bienvenido, ' + this.username + '!', 'Has ingresado correctamente.');
        
        this.router.navigate(['/loading']);
        setTimeout(() => {
          this.router.navigate(['/home',{ username: this.username }]);
        },1500);
      } 
      else {
        this.showAlert('Error de Inicio de Sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }
  
    goToRecuperarPass() {
      this.router.navigate(['/loading']);
      setTimeout(() => {
        this.router.navigate(['/login/recuperar-pass',]);
      },1500);
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
  