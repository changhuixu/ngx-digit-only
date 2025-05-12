import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DigitOnlyDirective } from '../../../projects/uiowa/digit-only/src/public-api';

@Component({
  selector: 'app-digit-only-demos',
  imports: [DigitOnlyDirective, FormsModule],
  templateUrl: './digit-only-demos.component.html',
  styleUrl: './digit-only-demos.component.css',
})
export class DigitOnlyDemosComponent {
  amount = '';
  min = 0;
  max = 10;
  decimalPattern = new RegExp('[0-9]+([.][0-9]+)?');
  pattern = '';

  constructor() {}

  ngOnInit(): void {}
  watchAmountValue() {
    const value = Number(this.amount);
    this.amount = value.toFixed(2);
    console.log(this.amount);
  }
}
