import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export interface CardData {
  state: 'default' | 'flipped' | 'matched';
}

@Component({
  selector: 'app-flipper',
  templateUrl: './flipper.component.html',
  styleUrls: ['./flipper.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('flipped', style({
        transform: 'none'
      })),
      state('default', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('250ms')
      ]),
      transition('flipped => default', [
        animate('250ms')
      ])
    ])
  ]
})
export class FlipperComponent implements OnInit {

  data: CardData = {
    state: "default"
  };

  ngOnInit(): void {
  }

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
    console.log(this.data.state);
  }
}

