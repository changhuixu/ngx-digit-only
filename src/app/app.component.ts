import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  amount: string;
  decimalPattern = new RegExp('[0-9]+([\.][0-9]+)?');

  pattern = '';

  watchAmountValue() {
    const value = Number(this.amount);
    this.amount = value.toFixed(2);
    console.log(this.amount);
  }
}
