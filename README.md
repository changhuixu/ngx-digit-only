# Angular DigitOnly Directive

An Angular directive only allows [0-9] in the input box when typing, pasting or drag/dropping. This directive handles both Windows keyboard and Mac keyboard.

Since **v1.1.0**, this directive accepts an attribute which indicates if the input number allows a decimal point.

Since **v1.3.0**, this directive accepts an attribute for the separator for decimal numbers. By default, the separator is a `.`. You can set it to comma when needed.

Since **v1.5.0**, this directive will check the input `pattern` attribute if set. See an example below about an input only allows decimal numbers with precision of 2.

[![Build Status](https://img.shields.io/travis/changhuixu/ngx-digit-only/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/changhuixu/ngx-digit-only)
[![npm](https://img.shields.io/npm/v/@uiowa/digit-only.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/digit-only)

## [Medium Article](https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3)

## [Demo](https://digit-only.firebaseapp.com)

## Installation

```shell
npm i -S @uiowa/digit-only
```

## Usage

```typescript
// in your Angular module
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    BrowserModule,
    DigitOnlyModule
  ],
  ...
})
export class YourModule { }
```

```html
// in your component.html
<input type="text" digitOnly />

// pull out the numeric keypad in mobile devices and tablets
<input
  type="text"
  name="zipcode"
  id="zipcode"
  placeholder="00000"
  maxlength="5"
  inputmode="numeric"
  pattern="[0-9]*"
  digitOnly
/>

// turn off browser autocomplete
<input ... autocomplete="off" />

// allows decimal input
<input
  id="decimal-number"
  type="text"
  digitOnly
  decimal="true"
  placeholder="000"
/>

// allows to set decimal separator
<label for="digit-only-decimal-comma">
  Digit Only input box that allows a <i>decimal point</i> using
  <strong>a comma as the separator</strong>
</label>
<input
  id="digit-only-decimal-comma"
  type="text"
  digitOnly
  decimal="true"
  decimalSeparator=","
  placeholder="0,00"
  pattern="[0-9]+([,][0-9]+)?"
/>

// Digit Only input only allows two decimal places
<input
  id="currency"
  type="text"
  name="currency"
  inputmode="numeric"
  pattern="^\d+(\.\d{1,2})?$"
  placeholder="0.00"
  digitOnly
  decimal="true"
/>
```
