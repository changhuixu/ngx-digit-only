import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DigitOnlyModule } from 'projects/uiowa/digit-only/src/public-api';
// import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, DigitOnlyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
