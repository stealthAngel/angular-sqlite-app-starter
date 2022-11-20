import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent {

  @Input() widthPercentage: number;

  getWidthPercentage() {
    if(this.widthPercentage > 100) {
      return 100 + '%';
    }
    if(this.widthPercentage < 0) {
      return 0 + '%';
    }
    return this.widthPercentage + '%';
  }
}

