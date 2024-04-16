import { Component } from '@angular/core';

@Component({
  selector: 'app-digit-only-demos',
  templateUrl: './digit-only-demos.component.html',
  styleUrls: ['./digit-only-demos.component.css'],
})
export class DigitOnlyDemosComponent {
  amount: string = '';
  min = 0;
  max = 10;
  decimalPattern = new RegExp('[0-9]+([.][0-9]+)?');
  pattern = '';

  constructor() {}

  watchAmountValue() {
    const value = Number(this.amount);
    this.amount = value.toFixed(2);
    console.log(this.amount);
  }
}
