import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  private _hasDecimal = false;
  private _navKeys = [
    'Backspace',
    'Delete',
    'Clear',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Copy',
    'Paste'
  ];
  @Input() decimal = false;
  @Input() decimalSeparator = '.';
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (
      this._navKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (this.decimal && e.key === this.decimalSeparator && !this._hasDecimal) // Allow: only one decimal point
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(_: KeyboardEvent): void {
    this._setHasDecimal();
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    const pastedInput = e.clipboardData.getData('text/plain');
    this._pasteData(pastedInput);
    this._setHasDecimal();
    e.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent): void {
    const textData = e.dataTransfer.getData('text');
    this.inputElement.focus();
    this._pasteData(textData);
    this._setHasDecimal();
    e.preventDefault();
  }

  private _pasteData(pastedContent: string): void {
    const sanitizedContent = this._sanatizeInput(pastedContent);
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      const { selectionStart: start, selectionEnd: end } = this.inputElement;
      this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
    }
  }

  private _sanatizeInput(input: string): string {
    let result = '';
    const selectedText = this._getSelection();
    const inputHasDecimal = this._hasDecimalSeparator(input);
    const selectionHasDecimal = this._hasDecimalSeparator(selectedText);
    if (this.decimal && this._hasDecimal && inputHasDecimal && !selectionHasDecimal) {
      result = input.replace(/[^0-9]/g, '');
    } else {
      const regex = new RegExp(`[^0-9${this.decimalSeparator}]`, 'g');
      result = input.replace(regex, '');
    }

    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) { // the input element has maxLength limit
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
  }

  private _hasDecimalSeparator(string: string): boolean {
    const regex = new RegExp(`\\${this.decimalSeparator}`);
    return regex.test(string);
  }

  private _setHasDecimal(): void {
    if (this.decimal) {
      const regex = new RegExp(`\\${this.decimalSeparator}`);
      const currentValue = this.inputElement.value;
      this._hasDecimal = regex.test(currentValue);
    }
  }

  private _getSelection(): string {
    return this.inputElement.value.substring(
      this.inputElement.selectionStart,
      this.inputElement.selectionEnd
    );
  }
}
