describe('Keyboard Typing', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should accept number keys, not other symbols', () => {
    cy.get('#digit-only')
      .type('1s2d 4d*(,.3')
      .should('have.value', '1243')
      .clear();
  });

  it('should accept control keys', () => {
    cy.get('#digit-only')
      .type('124{leftarrow}3{rightarrow}')
      .type('{uparrow}{downarrow}5.{backspace}5')
      .should('have.value', '12345')
      .clear();
  });

  it('should accept a decimal point', () => {
    cy.get('#digit-only-decimal')
      .type('1s2d4d*(,.3')
      .should('have.value', '124.3')
      .type('.3')
      .should('have.value', '124.33')
      .type('{leftarrow}{leftarrow}{leftarrow}.5')
      .should('have.value', '1245.33')
      .clear();
  });

  it('should accept a decimal point using comma', () => {
    cy.get('#digit-only-decimal-comma')
      .type('1s2d4d*(,.3')
      .should('have.value', '124,3')
      .type('.3')
      .should('have.value', '124,33')
      .type(',6')
      .should('have.value', '124,336')
      .type('{leftarrow}{leftarrow}{leftarrow},5')
      .should('have.value', '124,5336')
      .type('{leftarrow}{leftarrow}{del}{rightarrow}7,')
      .should('have.value', '12457,336')
      .clear();
  });

  it('should accept a decimal point using comma', () => {
    cy.get('#digit-only-decimal-comma')
      .type('1s2d4d*(,.3')
      .should('have.value', '124,3')
      .type('.3')
      .should('have.value', '124,33')
      .type(',6')
      .should('have.value', '124,336')
      .type('{leftarrow}{leftarrow}{leftarrow},5')
      .should('have.value', '124,5336')
      .type('{leftarrow}{leftarrow}{del}{rightarrow}7,')
      .should('have.value', '12457,336')
      .clear();
  });

  it('should know the max length: 1', () => {
    cy.get('#digit-only-with-max-length')
      .type('1s2d4d*(,.3')
      .should('have.value', '124')
      .clear();
  });

  it('should know the max length: 2', () => {
    cy.get('#credit-card-number')
      .type('1s2d4d*(,.3')
      .should('have.value', '124')
      .clear();
  });

  it('should know the max length: 3', () => {
    cy.get('#decimal-number')
      .type('1s2d4d*(,.35')
      .should('have.value', '124.3')
      .clear();
  });

  it('should know the decimal precision', () => {
    cy.get('#currency')
      .type('1s2d4d*(,.351')
      .should('have.value', '124.35')
      .type('{leftarrow}{leftarrow}1')
      .should('have.value', '124.35')
      .type('{leftarrow}{leftarrow}1')
      .should('have.value', '1214.35')
      .type('{backspace}{backspace}{leftarrow}8')
      .should('have.value', '814.35')
      .type('{rightarrow}{rightarrow}{rightarrow}1')
      .should('have.value', '814.35')
      .type('{rightarrow}{backspace}1')
      .should('have.value', '814.15')
      .clear();
  });

  it('should correctly count decimal point when select input text', () => {
    cy.get('#digit-only-decimal').type('1.35').should('have.value', '1.35');

    cy.get<HTMLInputElement>('#digit-only-decimal').then(($el) => {
      $el[0].setSelectionRange(0, 4); // should select 1.35
      cy.get('#digit-only-decimal').type('.2').should('have.value', '.2');
    });
  });

  it('should correctly count decimal point when select input text 2', () => {
    cy.get('#dollar-amount').type('1.35').should('have.value', '1.35');

    cy.get<HTMLInputElement>('#dollar-amount').then(($el) => {
      $el[0].setSelectionRange(0, 4); // should select 1.35
      cy.get('#dollar-amount').type('.2.5').should('have.value', '.25');
    });
  });
});
