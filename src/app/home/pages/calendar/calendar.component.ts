import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/pages/login/login.component';
import { PrincipalComponent } from 'src/app/home/pages/principal/principal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, LoginComponent, PrincipalComponent, FormsModule]
})
export class CalendarComponent  implements OnInit {
  username: string='';
  deporte: string='';
  deporte_id: number=0;
  selectedDate: string = '';
  minDate: string = new Date('2024-11-15').toISOString();
  maxDate: string = new Date('2024-11-20').toISOString();

  constructor(private route:ActivatedRoute, private router:Router ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')||'';
    this.deporte = this.route.snapshot.paramMap.get('deporte')||'';
    this.deporte_id = parseInt(this.route.snapshot.paramMap.get('deporte_id') || '0');
  }

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    this.selectedDate = this.formatDate(date);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  goToEncuentros() {
    if (this.selectedDate) {
      this.router.navigate(['home/encuentros', {
        username: this.username,
        deporte: this.deporte,
        deporte_id: this.deporte_id,
        fecha: this.selectedDate
      }]);
    }
  }

  goToHome() {
      this.router.navigate(['/home',{username:this.username, deporte:this.deporte}]);
  }
}
