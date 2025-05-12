import { Routes } from '@angular/router';
import { DigitOnlyDemosComponent } from './digit-only-demos/digit-only-demos.component';
import { MaskDemosComponent } from './mask-demos/mask-demos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: 'demo', component: DigitOnlyDemosComponent },
  { path: 'mask', component: MaskDemosComponent },
  { path: '**', redirectTo: '' },
];
