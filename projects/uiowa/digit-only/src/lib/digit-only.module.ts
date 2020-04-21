import { NgModule } from '@angular/core';
import { DigitOnlyDirective } from './digit-only.directive';
import { MaskDirective } from './mask.directive';

@NgModule({
  imports: [],
  declarations: [DigitOnlyDirective, MaskDirective],
  exports: [DigitOnlyDirective, MaskDirective],
})
export class DigitOnlyModule {}
