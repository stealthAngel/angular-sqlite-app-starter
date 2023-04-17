import { Injectable, Inject, Renderer2, RendererFactory2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ColorTheme } from "../models/setting/settings.enum";
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setActiveTheme(item: string) {
    //currently did not found a way to remove all classes from this element
    for (let theme in ColorTheme) {
      this.renderer.removeClass(this.document.body, ColorTheme[theme]);
    }
    this.renderer.addClass(this.document.body, item);
  }

  setActiveFontTheme(font: string) {
    document.documentElement.style.setProperty("--ion-font-family", font);
  }
}
