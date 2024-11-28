import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/pages/login/login.component';
import { AuthService } from '../../../services/authService/auth.service';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';
import { Subscription } from 'rxjs';

interface Deporte {
  deporte_id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, LoginComponent]
})
export class PrincipalComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private sqlite: SqliteService
  ) {}

  username: string = '';
  deportes: Deporte[] = [];
  private dbSubscription?: Subscription;

  async ngOnInit() {
    try {
      this.deportes = [];
      
      await this.sqlite.init();
      
      this.dbSubscription = this.sqlite.dbReady.subscribe(async (isReady) => {
        if (isReady) {
          this.deportes = [];
          
          const deportesNombres = ['1', '2', '3'];
          
          for (const idDeporte of deportesNombres) {
            const deporteInfo = await this.sqlite.readDeporte(parseInt(idDeporte));
            if (deporteInfo) {
              this.deportes.push({
                deporte_id: deporteInfo.deporte_id,
                nombre: deporteInfo.nombre,
                descripcion: deporteInfo.descripcion,
                imagen: 'assets/login1.png'
              });
            }
          }
          console.log('Deportes cargados:', this.deportes);
        }
      });

      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.username = currentUser.username;
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  ngOnDestroy() {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }

  goToCalendar(deporte: Deporte) {
    this.router.navigate(['home/calendar', { username: this.username, deporte: deporte.nombre, deporte_id: deporte.deporte_id }]);
  }

  goToLogin() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home', { username: this.username }]);
    }, 1500);
  }
}
