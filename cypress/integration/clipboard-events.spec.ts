describe('Copy & Paste', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should copy and paste in a regular input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });
    const el = Cypress.$('#regular-text')[0];
    el.dispatchEvent(pasteEvent);
    // todo:: doesn't change input element value
  });

  it('should only allow numbers in a regular input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc123.0');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers
      cy.get('#digit-only').should('have.value', '1230');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only')
      .type('{leftarrow}{leftarrow}4')
      .should('have.value', '12430');

    cy.get('#digit-only').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should paste at the correct cursor position
      cy.get('#digit-only').should('have.value', '124123030');
    });

    cy.get('#digit-only').clear();
  });

  it('should only allow numbers and decimal place in a decimal input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc123.0s1');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-decimal').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers and a decimal place
      cy.get('#digit-only-decimal').should('have.value', '123.01');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only-decimal')
      .type('{leftarrow}{leftarrow}{leftarrow}4')
      .should('have.value', '1234.01');

    cy.get('#digit-only-decimal').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should paste at the correct cursor position
      cy.get('#digit-only-decimal').should('have.value', '123412301.01');
    });

    cy.get('#digit-only-decimal').clear();
  });

  it('should only allow at most one decimal place in a decimal input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc1.0s.1');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-decimal').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers; two decimal places are ignored
      cy.get('#digit-only-decimal').should('have.value', '101');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only-decimal')
      .type('{leftarrow}{leftarrow}2')
      .should('have.value', '1201');

    cy.get('#digit-only-decimal').then(($el) => {
      dt.setData('text/plain', '4.5');
      $el[0].dispatchEvent(pasteEvent);
      // should paste at the correct cursor position
      cy.get('#digit-only-decimal').should('have.value', '124.501');
    });

    cy.get('#digit-only-decimal').then(($el) => {
      dt.setData('text/plain', '4,5');
      $el[0].dispatchEvent(pasteEvent);
      // should ignore comma
      cy.get('#digit-only-decimal').should('have.value', '124.54501');
    });

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      $el[0].setSelectionRange(2, 8); // should select 4.5450

      dt.setData('text/plain', '7.8');
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#digit-only-decimal').should('have.value', '127.81');
    });

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      $el[0].setSelectionRange(2, 3); // should select 7

      dt.setData('text/plain', '3.4');
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#digit-only-decimal').should('have.value', '1234.81');
    });

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      $el[0].setSelectionRange(0, 7); // should select 1234.81

      dt.setData('text/plain', '.4');
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#digit-only-decimal').should('have.value', '.4');
    });

    cy.get('#digit-only-decimal').clear();
  });

  it('s', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc1.0s.1');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-decimal').type('.4').should('have.value', '.4');

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      $el[0].setSelectionRange(0, 2); // should select .4
      cy.get('#digit-only-decimal').type('.2').should('have.value', '.2');
    });

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      dt.setData('text/plain', '.3');
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#digit-only-decimal').should('have.value', '.23'); // the second decimal point should not be accepted
    });

    cy.get('#digit-only-decimal').clear();
  });

  it('should only accept comma as decimal place in a decimal input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc1,0s.1');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-decimal-comma').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers; two decimal places are ignored
      cy.get('#digit-only-decimal-comma').should('have.value', '1,01');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only-decimal-comma')
      .type('{leftarrow}{leftarrow}2,')
      .should('have.value', '1,201');

    cy.get('#digit-only-decimal-comma').then(($el) => {
      dt.setData('text/plain', '4.5');
      $el[0].dispatchEvent(pasteEvent);
      // should paste at the correct cursor position
      cy.get('#digit-only-decimal-comma').should('have.value', '1,24501');
    });

    cy.get('#digit-only-decimal-comma').then(($el) => {
      dt.setData('text/plain', '4,5');
      $el[0].dispatchEvent(pasteEvent);
      // should ignore the second comma
      cy.get('#digit-only-decimal-comma').should('have.value', '1,2454501');
    });

    cy.get('#digit-only-decimal-comma').clear();
  });

  it('should not exceed the max length: 1', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc1.0');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-with-max-length').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers
      cy.get('#digit-only-with-max-length').should('have.value', '10');
    });

    cy.get('#digit-only-with-max-length').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow 3 digits
      cy.get('#digit-only-with-max-length').should('have.value', '101');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only-with-max-length')
      .type('{leftarrow}{backspace}')
      .should('have.value', '11');

    cy.get('#digit-only-with-max-length').then(($el) => {
      dt.setData('text/plain', '4.5');
      $el[0].dispatchEvent(pasteEvent);
      // should paste at the correct cursor position
      cy.get('#digit-only-with-max-length').should('have.value', '141');
    });

    cy.get('#digit-only-with-max-length').clear();
  });

  it('should not exceed the max length: 2', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '12.345');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#decimal-number').clear();

    cy.get('#decimal-number').then(($el) => {
      dt.setData('text/plain', '123456');
      $el[0].dispatchEvent(pasteEvent);
      // should only allow numbers
      cy.get('#decimal-number').should('have.value', '12345');
    });

    // should move cursor and accept a new digit
    cy.get('#decimal-number')
      .type('{leftarrow}{backspace}{backspace}.67')
      .should('have.value', '12.65');

    cy.get('#decimal-number').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      // should only allow 5 digits
      cy.get('#decimal-number').should('have.value', '12.65');
    });

    cy.get('#decimal-number').clear();
  });

  it('should accept negative sign (only once)', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', '-123');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#negative-digit-only').clear();

    cy.get('#negative-digit-only').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#negative-digit-only').should('have.value', '-123');
    });

    cy.get('#negative-digit-only').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#negative-digit-only').should('have.value', '-123123');
    });

    cy.get('#negative-digit-only').clear();
  });

  it('should disable paste when [allowPaste] is false', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'a-123');
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    });

    cy.get('#digit-only-disable-paste').clear();

    cy.get('#digit-only-disable-paste').then(($el) => {
      $el[0].dispatchEvent(pasteEvent);
      cy.get('#digit-only-disable-paste').should('have.value', '');
    });

    cy.get('#digit-only-disable-paste').clear();
  });
});
