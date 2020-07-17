# Angular DigitOnly Directive and Mask Directive

[![Build Status](https://img.shields.io/travis/changhuixu/ngx-digit-only/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/changhuixu/ngx-digit-only)
[![npm](https://img.shields.io/npm/v/@uiowa/digit-only.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/digit-only)

## [Demo](https://digit-only.firebaseapp.com)

[Medium Article: Digit Only Directive in Angular](https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3)

- [x] **input `digitOnly` directive**

  An Angular directive only allows [0-9] in the input box when typing, pasting or drag/dropping. This directive handles both Windows keyboard and Mac keyboard.

- [x] **input `mask` directive**

  This directive checks the input `pattern` attribute if set.

## CHANGELOG

- **v1.1.0**: this directive accepts an attribute which indicates if the input number allows a decimal point.

- **v1.3.0**: this directive accepts an attribute for the separator for decimal numbers.

  - By default, the separator is a `.`. You can set it to comma when needed.

- **v1.5.0**: this directive checks the input `pattern` attribute if set.

  - See an example below about an input only allows decimal numbers with precision of 2.

- **v1.6.0**: the `mask` directive is added to this library.

  - See an example below about an input allows `##-####`.

- **v1.7.0**: the `digitOnly` directive allows model binding to `min`, `max`, and `pattern` properties.

  - See demo page for examples.

- **v1.8.0**: fix an issue ([#38]) when pasting in IE and Edge for the `digitOnly` directive

- **v2.0.0**: add `tslib` v2.0 in the dependency, which is required by TypeScript 3.9 (as of Angular 10).

- **v2.1.0**(**v1.9.0**): fix an issue ([#39]) when typing decimal numbers for the `digitOnly` directive

---

## Installation

```shell
npm i @uiowa/digit-only
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

### `mask` directive usage

```html
// input masked with pattern attribute: <code>##-####</code>
<input
  id="org-dept"
  type="text"
  pattern="^(\d{0,2}|\d{2}-\d{0,4})$"
  name="org-dept"
  title="org-dept"
  placeholder="00-0000"
  mask
/>
```
