import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-flipper',
  templateUrl: './flipper.component.html',
  styleUrls: ['./flipper.component.scss'],
})
export class FlipperComponent implements OnInit {

  data: boolean = false;
  @Input()
  customFrontCss: string;
  ngOnInit(): void {
  }

  cardClicked() {
    this.data = !this.data;
  }
}

