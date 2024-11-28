import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class RecuperarPassComponent implements AfterViewInit {
  userEmail: string = '';
  
  constructor(
    private router: Router, 
    private alertController: AlertController,
    private sqliteService: SqliteService
  ) {}

  ngAfterViewInit() {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  resetForm() {
    this.userEmail = '';
  }

  async resetPassword() {
    if (!this.userEmail) {
      await this.showAlert('Error', 'Por favor, introduce un Usuario válido.');
      return;
    }

    try {
      const user = await this.sqliteService.getUserByUsername(this.userEmail);
      
      if (user) {
        await this.showAlert('Solicitud Recibida', 'Lo contactaremos para cambiar su contraseña.');
        this.resetForm();
        
        this.router.navigate(['/loading']);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        await this.showAlert('Error', 'Usuario no registrado. Por favor, introduce un Usuario válido.');
        this.resetForm();
      }
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      await this.showAlert('Error', 'Ocurrió un error al verificar el usuario. Por favor, intenta nuevamente.');
      this.resetForm();
    }
  }
  
  goToLogin() {
    this.resetForm();
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}

