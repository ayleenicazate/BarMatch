import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

interface Encuentro {
  id: number;
  deporte_id: number;
  fecha: string;
  nombre: string;

}


@Component({
  selector: 'app-encuentro',
  templateUrl: './encuentro.component.html',
  styleUrls: ['./encuentro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EncuentroComponent implements OnInit, OnDestroy {
  username: string = '';
  deporte: string = '';
  deporte_id: number = 0;
  fechaSeleccionada: string = '';
  encuentros: Encuentro[] = [];
  dbError: boolean = false;
  private dbSubscription?: Subscription;

  constructor(
    private router: Router,
    private sqlite: SqliteService
  ) { }

  async ngOnInit() {
    try {
      // Recuperar datos del history state
      const state = history.state;
      if (state) {
        this.username = state.username;
        this.deporte = state.deporte;
        this.deporte_id = state.deporte_id;
        this.fechaSeleccionada = state.fecha;
      }

      await this.sqlite.init();
      
      this.dbSubscription = this.sqlite.dbReady
        .pipe(take(1))
        .subscribe(async (isReady) => {
          if (isReady) {
            try {
              const encuentrosData = await this.sqlite.readEncuentros(
                this.deporte_id, 
                this.fechaSeleccionada
              );
              
              this.encuentros = encuentrosData.map(e => ({
                id: e.encuentro_id,
                deporte_id: e.deporte_id,
                fecha: e.fecha,
                nombre: e.nombre
              }));
              
            } catch (error) {
              console.error('Error al cargar encuentros:', error);
              this.dbError = true;
            }
          }
        });
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      this.dbError = true;
    }
  }

  ngOnDestroy() {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }

  seleccionarEncuentro(encuentro: Encuentro) {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
        encuentro_id: encuentro.id,
        encuentro_nombre: encuentro.nombre,
        deporte_id: encuentro.deporte_id,
        deporte: this.deporte,
        fecha: encuentro.fecha
      }
    };

    this.router.navigate(['/home/bar'], navigationExtras);
  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username
      }
    };

    this.router.navigate(['/loading']).then(() => {
      setTimeout(() => {
        this.router.navigate(['/home'], navigationExtras);
      }, 1500);
    });
  }

  goToCalendar() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
        deporte: this.deporte,
        deporte_id: this.deporte_id
      }
    };

    this.router.navigate(['/home/calendar'], navigationExtras);
  }
}
