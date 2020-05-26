import {
  Directive, TemplateRef, ViewContainerRef, Input, Renderer2,
  OnChanges, SimpleChanges, OnInit
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {map} from "rxjs/internal/operators";

@Directive({
  selector: '[appStaticHtml]'
})
export class StaticHtmlDirective implements OnInit, OnChanges {

  @Input()
  appStaticHtml: string;
  @Input()
  appStaticHtmlTrusted: boolean;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer,
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.insertStaticView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appStaticHtml'].firstChange) {
      return;
    }
    this.insertStaticView();
  }

  private insertStaticView(): void {
    this.getStaticHTML().pipe(
      map(response => this.mapStaticHtml(response))
    ).subscribe(response => {
      this.replaceHtml(response);
    });
  }

  private getStaticHTML(): Observable<string> {
    return this.httpClient.get(this.appStaticHtml, {
      responseType: 'text'
    });
  }

  private mapStaticHtml(htmlString: string): string {
    return this.appStaticHtmlTrusted ?
      htmlString :
      this.domSanitizer.bypassSecurityTrustUrl(htmlString)['changingThisBreaksApplicationSecurity'];
  }

  private replaceHtml(innerHTML: string): void {
    this.viewContainer.remove();
    const embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    this.renderer.setProperty(embeddedViewRef.rootNodes[0], 'innerHTML', innerHTML);
  }
}
