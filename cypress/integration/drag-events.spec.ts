describe('Drag Event Tests', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should only allow numbers in a regular input element', () => {
    const dt = new DataTransfer();
    dt.setData('text/plain', 'abc123.0');
    const dragEvent = new DragEvent('drop', {
      dataTransfer: dt,
      bubbles: true,
      cancelable: true,
    });

    // should only drop digits
    cy.get('#digit-only').then(($el) => {
      $el[0].dispatchEvent(dragEvent);
      cy.get('#digit-only').should('have.value', '1230');
    });

    // should move cursor and accept a new digit
    cy.get('#digit-only')
      .type('{leftarrow}{leftarrow}4')
      .should('have.value', '12430');

    // should drop at the correct cursor position
    cy.get('#digit-only').then(($el) => {
      $el[0].dispatchEvent(dragEvent);
      cy.get('#digit-only').should('have.value', '124123030');
    });

    cy.get('#digit-only').clear();
  });
});
