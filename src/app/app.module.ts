import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DigitOnlyModule } from 'projects/uiowa/digit-only/src/public-api';
import { DigitOnlyDemosComponent } from './digit-only-demos/digit-only-demos.component';
import { MaskDemosComponent } from './mask-demos/mask-demos.component';
// import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [AppComponent, DigitOnlyDemosComponent, MaskDemosComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DigitOnlyModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'demo' },
      { path: 'demo', component: DigitOnlyDemosComponent },
      { path: 'mask', component: MaskDemosComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
