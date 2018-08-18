import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DigitOnlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
