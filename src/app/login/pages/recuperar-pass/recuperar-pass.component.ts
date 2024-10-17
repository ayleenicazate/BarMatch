import { AfterViewInit, Component,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})


export class RecuperarPassComponent  implements AfterViewInit {
  userEmail: string = ''; // dejar predefinido usuario

  // Usuario registrado en duro
  registeredUser: string = 'víctor'; // restriccion para confirmacion de usuario
  
  constructor(private router: Router, private alertController: AlertController) {}
  ngAfterViewInit() {}

  
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  resetPassword() {
    if (this.userEmail) {
      
      if (this.userEmail === this.registeredUser) {
        console.log('Usuario:', this.userEmail);

        // Si esta bien arroja este mensaje
        this.showAlert('¡Éxito!', 'Usuario válido. Redirigiendo...');

        // Redirige a la página que deseemos
        this.router.navigate(['/loading']);
        setTimeout(() => {
          this.router.navigate(['/login',]);
        },1500);
      } else {
        // Si esta mal arroja este mensaje
        this.showAlert('Error', 'Usuario no registrado. Por favor, introduce un Usuario válido.');
      }
    } else {
      // Si esta vacio arroja este mensaje
      this.showAlert('Error', 'Por favor, introduce un Usuario válido.');
    }
  }
  
  goToLogin() {
      this.router.navigate(['/loading']);
      setTimeout(() => {
        this.router.navigate(['/login',]);
      },1500);
    }
  
}

