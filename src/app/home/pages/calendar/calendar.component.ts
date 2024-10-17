import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class CalendarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
