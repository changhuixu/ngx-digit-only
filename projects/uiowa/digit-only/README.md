# Angular DigitOnly Directive and Mask Directive

[![Build Status](https://travis-ci.com/changhuixu/ngx-digit-only.svg?branch=main)](https://travis-ci.com/changhuixu/ngx-digit-only)
[![npm](https://img.shields.io/npm/v/@uiowa/digit-only.svg)](https://www.npmjs.com/package/@uiowa/digit-only)

## [Demo](https://digit-only.firebaseapp.com)

[Medium Article: Digit Only Directive in Angular](https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3)

- [x] **input `digitOnly` directive**

  An Angular directive only allows [0-9] in the input box when typing, pasting or drag/dropping. This directive handles both Windows keyboard and Mac keyboard. This directive works with `input type="text"`, not `input type="number"`.

- [x] **input `mask` directive**

  This directive checks the input `pattern` attribute if set.

## CHANGELOG

- **v3.2.0**(**v2.4.0**): `digitOnly` directive now supports disabling paste events (merges a pull request [#57](/../../pull/49), fixes [#56](/../../issues/56)).

- **v3.1.0**(**v2.3.0**): `digitOnly` directive now supports negative values (merges a pull request [#49](/../../pull/49)).

- **v3.0.0**: a release on par with Angular 12. For projects in Angular v10 or v11, please use v2 of this library.

- **v2.2.3**: fix an issue ([#50](/../../issues/50)) in the `mask` directive: support dynamic pattern attribute binding.

- **v2.2.2**: fix an issue ([#28](/../../issues/28)) to prevent [dead keys](https://en.wikipedia.org/wiki/Dead_key) in the `digitOnly` directive.

- **v2.2.1**: `digitOnly` directive now dispatches an `input` event when paste in Firefox.

- **v2.2.0**: fix an issue ([#35](/../../issues/35)): for better international support, both `mask` and `digitOnly` directives now also check the `code` attribute in `KeyboardEvent`.

- **v2.1.0**(**v1.9.0**): fix an issue ([#39](/../../issues/39)) when typing decimal numbers for the `digitOnly` directive

- **v2.0.0**: add `tslib` v2.0 in the dependency, which is required by TypeScript 3.9 (as of Angular 10).

- **v1.8.0**: fix an issue ([#38](/../../issues/38)) when pasting in IE and Edge for the `digitOnly` directive

- **v1.7.0**: the `digitOnly` directive allows model binding to `min`, `max`, and `pattern` properties.

  - See demo page for examples.

- **v1.6.0**: the `mask` directive is added to this library.

  - See an example below about an input allows `##-####`.

- **v1.5.0**: this directive checks the input `pattern` attribute if set.

  - See an example below about an input only allows decimal numbers with precision of 2.

- **v1.3.0**: this directive accepts an attribute for the separator for decimal numbers.

  - By default, the separator is a `.`. You can set it to comma when needed.

- **v1.1.0**: this directive accepts an attribute which indicates if the input number allows a decimal point.

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
