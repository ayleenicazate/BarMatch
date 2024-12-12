import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/pages/login/login.component';
import { PrincipalComponent } from 'src/app/home/pages/principal/principal.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    LoginComponent, 
    PrincipalComponent, 
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CalendarComponent  implements OnInit {
  username: string='';
  deporte: string='';
  deporte_id: number=0;
  selectedDate: string = '';
  selectedDateObj: Date | null = null;

  minDateObj: Date = new Date('2024-11-16');

  maxDateObj: Date = new Date('2024-11-21');

  constructor(
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    // Recuperar datos del history state
    const state = history.state;
    if (state) {
      this.username = state.username;
      this.deporte = state.deporte;
      this.deporte_id = state.deporte_id;
    }
  }

  ngOnInit() {
    
  }

  onDateChange(event: Date) {
    this.selectedDate = this.formatDate(event);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  goToEncuentros() {
    if (this.selectedDate) {
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.username,
          deporte: this.deporte,
          deporte_id: this.deporte_id,
          fecha: this.selectedDate
        }
      };

      this.router.navigate(['/home/encuentros'], navigationExtras);
    }
  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
        deporte: this.deporte
      }
    };

    this.router.navigate(['/home'], navigationExtras);
  }
}
