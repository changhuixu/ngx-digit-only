import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  DigitOnlyDirective,
  MaskDirective,
} from '../../projects/uiowa/digit-only/src/public-api';
import { AppComponent } from './app.component';
import { DigitOnlyDemosComponent } from './digit-only-demos/digit-only-demos.component';
import { MaskDemosComponent } from './mask-demos/mask-demos.component';

@NgModule({
  declarations: [AppComponent, DigitOnlyDemosComponent, MaskDemosComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'demo' },
      { path: 'demo', component: DigitOnlyDemosComponent },
      { path: 'mask', component: MaskDemosComponent },
      { path: '**', redirectTo: '' },
    ]),

    // DigitOnly
    DigitOnlyDirective,
    MaskDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
