import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class BarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
