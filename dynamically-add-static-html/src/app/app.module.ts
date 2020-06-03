import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StaticHtmlDirective } from './static-html.directive';
import {HttpClientModule} from "@angular/common/http";
import { StaticHtmlComponent } from './static-html/static-html.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticHtmlDirective,
    StaticHtmlComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
