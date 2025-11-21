describe('Copy & Paste', () => {
  beforeEach(() => {
    cy.visit('');
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
});
