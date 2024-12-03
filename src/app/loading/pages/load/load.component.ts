import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import type { AfterViewInit,QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LoadComponent  implements AfterViewInit {

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  private animation!: Animation;
  private isPlaying = false;
  private isPaused = false;
  private isStopped = true;

  constructor(private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    
 
      const cardB = this.animationCtrl

      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.2, transform: 'scale(1.5)', opacity: '0.8' },
        { offset: 0.4, transform: 'scale(2.0)', opacity: '0.6' },
        { offset: 0.6, transform: 'scale(2.5)', opacity: '0.5' },
        { offset: 0.8, transform: 'scale(3.0)', opacity: '0.4' },
        { offset: 1.0, transform: 'scale(3.5)', opacity: '0.4' },
      ]);
    
    this.animation = this.animationCtrl
      .create()
      .duration(1600)
      .iterations(Infinity)
      .addAnimation([cardB]);
      this.animation.play();  
      
  
  }

  play() {
    this.animation.play();
    this.isPlaying = true;
    this.isPaused = false;
    this.isStopped = false;
  }

  pause() {
    this.animation.pause();
    this.isPlaying = false;
    this.isPaused = true;
    this.isStopped = false;
  }

  stop() {
    this.animation.stop();
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;
  }

  // Métodos para verificar el estado
  isAnimationPlaying(): boolean {
    return this.isPlaying;
  }

  isAnimationPaused(): boolean {
    return this.isPaused;
  }

  isAnimationStopped(): boolean {
    return this.isStopped;
  }

}
