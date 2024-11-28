import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteService } from '../../../services/sqliteService/sqlite.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

interface Bar {
  bar_id: number;
  nombre: string;
  direccion: string;
}

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BarComponent implements OnInit, OnDestroy {
  username: string = '';
  encuentro_id: number = 0;
  encuentroNombre: string = '';
  deporte_id: number = 0;
  deporte: string = '';
  fecha: string = '';
  bares: Bar[] = [];
  dbError: boolean = false;
  private dbSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private sqlite: SqliteService
  ) {}

  async ngOnInit() {
    try {
      this.username = this.route.snapshot.paramMap.get('username') || '';
      this.encuentro_id = Number(this.route.snapshot.paramMap.get('encuentro_id'));
      this.encuentroNombre = this.route.snapshot.paramMap.get('encuentro_nombre') || '';
      this.deporte = this.route.snapshot.paramMap.get('deporte') || '';
      this.deporte_id = Number(this.route.snapshot.paramMap.get('deporte_id'));
      this.fecha = this.route.snapshot.paramMap.get('fecha') || '';

      await this.sqlite.init();
      
      this.dbSubscription = this.sqlite.dbReady
        .pipe(take(1))
        .subscribe(async (isReady) => {
          if (isReady) {
            await this.cargarBares();
          }
        });
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      this.dbError = true;
    }
  }

  async cargarBares() {
    try {
      const encuentroBares = await this.sqlite.readEncuentroBar(this.encuentro_id);
      console.log('EncuentroBares encontrados:', encuentroBares);

      this.bares = [];

      for (const encuentroBar of encuentroBares) {
        if (encuentroBar && encuentroBar.bar_id) {
          const baresEncontrados = await this.sqlite.readBares(encuentroBar.bar_id);
          console.log('Bares encontrados para ID', encuentroBar.bar_id, ':', baresEncontrados);
          
          if (Array.isArray(baresEncontrados) && baresEncontrados.length > 0) {
            baresEncontrados.forEach(bar => {
              if (bar) {
                this.bares.push({
                  bar_id: bar.bar_id,
                  nombre: bar.nombre,
                  direccion: bar.direccion
                });
              }
            });
          }
        }
      }

      console.log('Total de bares cargados:', this.bares.length);
      console.log('Bares cargados:', this.bares);
    } catch (error) {
      console.error('Error al cargar bares:', error);
      this.dbError = true;
    }
  }

  seleccionarBar(bar: Bar) {
    console.log('Bar seleccionado:', bar);
    this.router.navigate(['/home/cantpers', {
      username: this.username,
      deporte: this.deporte,
      bar_id: bar.bar_id,
      barNombre: bar.nombre,
      barDireccion: bar.direccion,
      encuentro_id: this.encuentro_id,
      encuentroNombre: this.encuentroNombre,
      fecha: this.fecha
    }]);
  }

  ngOnDestroy() {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }

  goToHome() {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/home', {username: this.username}]);
    }, 1500);
  }

  goToEncuentros() {
      this.router.navigate(['/home/encuentros', {
        username: this.username,
        fecha: this.fecha,
        deporte_id: this.deporte_id,
        deporte: this.deporte
      }]);
  }
}
    
