import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {

  @Input() widthPercentage: number;

  ngOnInit(): void {
  //set .loading-bar:after width to 60%
    this.updateLoadingBar();
  }

  ngOnChanges() {
    this.updateLoadingBar();
  }

  updateLoadingBar(){
    document.querySelector('div').style.setProperty('--width-value', this.getWidthPercentage());

  }

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

