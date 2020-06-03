import {
  Directive, TemplateRef, ViewContainerRef, Input, Renderer2,
  OnChanges, SimpleChanges, OnInit
} from '@angular/core';
import {StaticHtmlService} from "./static-html.service";

@Directive({
  selector: '[appStaticHtml]'
})
export class StaticHtmlDirective implements OnInit, OnChanges {

  @Input()
  appStaticHtml: string;
  @Input()
  appStaticHtmlTrusted: boolean;

  constructor(
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private staticHtmlService: StaticHtmlService
  ) { }

  ngOnInit(): void {
    this.insertStaticView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.appStaticHtml) {
      return;
    }
    this.insertStaticView();
  }

  private insertStaticView(): void {
    this.staticHtmlService
      .getStaticHTML(this.appStaticHtml, this.appStaticHtmlTrusted)
      .subscribe(response => { this.replaceHtml(response )});
  }

  private replaceHtml(innerHTML: string): void {
    this.viewContainer.remove();
    const embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    this.renderer.setProperty(embeddedViewRef.rootNodes[0], 'innerHTML', innerHTML);
  }
}
