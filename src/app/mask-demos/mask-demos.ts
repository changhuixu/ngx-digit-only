import { Component } from '@angular/core';
import { MaskDirective } from '../../../projects/uiowa/digit-only/src/public-api';

@Component({
  selector: 'app-mask-demos',
  imports: [MaskDirective],
  templateUrl: './mask-demos.html',
  styleUrl: './mask-demos.css',
})
export class MaskDemos {}
