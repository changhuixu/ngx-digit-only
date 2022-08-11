describe('Patterns', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should change pattern on runtime using the binding', () => {
    cy.get('#change-pattern')
      .clear()
      .type('^[0-9]{1,5}$', { parseSpecialCharSequences: false });

    cy.get('#pattern-binding')
      .type('112345556')
      .should('have.value', '11234')
      .clear();

    cy.get('#change-pattern')
      .clear()
      .type('^[1-2]+$');

    cy.get('#pattern-binding')
      .type('515.26789.2')
      .should('have.value', '122')
      .clear();

    cy.get('#change-pattern').clear()

    cy.get('#pattern-binding')
      .type('112345556')
      .should('have.value', '112345556')
      .clear();
  });

  it('if pattern is empty, should allow any numeric input', () => {
    cy.get('#pattern-binding')
      .type('112345556')
      .should('have.value', '112345556')
      .clear();
  });
});
