describe('Min max', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should only numbers between 0 and 100', () => {
    cy.get('#digit-only-min-max')
      .type('0')
      .should('have.value', '0')
      .type('5')
      .should('have.value', '05')
      .type('0')
      .should('have.value', '050')
      .type('0')
      .should('have.value', '050')
      .clear()
      .type('100')
      .should('have.value', '100')
      .type('0')
      .should('have.value', '100')
      .clear()
      .type('201')
      .should('have.value', '20')
      .clear();
  });

  it('should change limits on runtime', () => {
    cy.get('#min')
      .clear()
      .type('5')

    cy.get('#max')
      .clear()
      .type('10')

    // number must be >= 5 and <= 10
    cy.get('#digit-only-min-max-binding')
      .type('0')
      .should('have.value', '')
      .type('5')
      .should('have.value', '5')
      .type('0')
      .should('have.value', '5')
      .clear()
      .type('100')
      .should('have.value', '')
      .clear();

    cy.get('#min')
      .clear()
      .type('8')

    cy.get('#max')
      .clear()
      .type('850')

    // number must be >= 8 and <= 850
    cy.get('#digit-only-min-max-binding')
      .type('0')
      .should('have.value', '')
      .type('5')
      .should('have.value', '')
      .type('0')
      .should('have.value', '')
      .clear()
      .type('850')
      .should('have.value', '850')
      .type('0')
      .should('have.value', '850')
      .clear();
  });
});
