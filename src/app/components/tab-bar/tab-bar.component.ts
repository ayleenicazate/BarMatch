import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent {
  constructor(private router: Router) {}

  goTo(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
