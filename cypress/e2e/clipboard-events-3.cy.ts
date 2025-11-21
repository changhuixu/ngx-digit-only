describe('Copy & Paste', () => {
  beforeEach(() => {
    cy.visit('');
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
});
