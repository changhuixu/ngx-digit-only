describe('Keyboard Typing', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should only allow pattern', () => {
    cy.get('#org-dept')
      .type('1s-2d 4d*(,.3')
      .should('have.value', '12')
      .type('-')
      .should('have.value', '12-')
      .type('-')
      .should('have.value', '12-')
      .type('0-0')
      .should('have.value', '12-00')
      .type('0-0')
      .should('have.value', '12-0000')
      .type('0-0')
      .should('have.value', '12-0000')
      .clear();
  });

  it('should work with arrow keys', () => {
    cy.get('#org-dept')
      .type('12-0000')
      .should('have.value', '12-0000')
      .type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}{backspace}')
      .should('have.value', '120000')
      .type('0-0')
      .should('have.value', '12-0000')
      .clear();
  });
});
