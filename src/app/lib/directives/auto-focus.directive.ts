import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { IonInput } from "@ionic/angular";

@Directive({
  selector: "[autoFocus]",
})
export class AutoFocusDirective implements OnInit {
  @Input() setAutofocus: boolean = true;

  private inputElement: IonInput;

  constructor(private elementRef: IonInput) {
    this.elementRef.setFocus();
  }

  ngOnInit(): void {
    if (this.setAutofocus) {
      this.inputElement.setFocus();
    }
  }
}
