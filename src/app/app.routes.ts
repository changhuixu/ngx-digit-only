import { Routes } from '@angular/router';
import { DigitOnlyDemos } from './digit-only-demos/digit-only-demos';
import { MaskDemos } from './mask-demos/mask-demos';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: 'demo', component: DigitOnlyDemos },
  { path: 'mask', component: MaskDemos },
  { path: '**', redirectTo: '' },
];
