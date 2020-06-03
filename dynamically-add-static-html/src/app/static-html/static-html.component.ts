import {Component, OnInit, SimpleChanges, Input} from '@angular/core';
import {StaticHtmlService} from "../static-html.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-static-html',
  templateUrl: './static-html.component.html',
  styleUrls: ['./static-html.component.css']
})
export class StaticHtmlComponent implements OnInit {

  innerHtml: SafeHtml;

  @Input()
  source: string;
  @Input()
  isTrusted: boolean;

  constructor(
    private staticHtmlService: StaticHtmlService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.insertStaticView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.source) {
      return;
    }
    this.insertStaticView();
  }

  private insertStaticView(): void {
    this.staticHtmlService
      .getStaticHTML(this.source, this.isTrusted)
      .subscribe(response => { this.replaceHtml(response )});
  }

  private replaceHtml(innerHTML: string): void {
    this.innerHtml = this.domSanitizer.bypassSecurityTrustHtml(innerHTML);
  }
}
