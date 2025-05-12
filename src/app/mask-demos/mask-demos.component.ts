import { Component } from '@angular/core';
import { MaskDirective } from '../../../projects/uiowa/digit-only/src/public-api';

@Component({
  selector: 'app-mask-demos',
  imports: [MaskDirective],
  templateUrl: './mask-demos.component.html',
  styleUrl: './mask-demos.component.css',
})
export class MaskDemosComponent {}
