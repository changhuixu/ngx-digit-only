const url = 'http://localhost:4200';

describe('Keyboard Typing', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('should accept number keys, not other symbols', () => {
    const input = cy.get('#digit-only');
    input.type('1s2d4d*(,.3').should('have.value', '1243');
    input.clear();
  });

  it('should accept control keys', () => {
    const input = cy.get('#digit-only');
    input
      .type('124{leftarrow}3{rightarrow}')
      .type('{uparrow}{downarrow}5.{backspace}5')
      .should('have.value', '12345');
    input.clear();
  });

  it('should accept a decimal point', () => {
    const input = cy.get('#digit-only-decimal');
    input.type('1s2d4d*(,.3').should('have.value', '124.3');
    input.type('.3').should('have.value', '124.33');
    input
      .type('{leftarrow}{leftarrow}{leftarrow}.5')
      .should('have.value', '1245.33');
    input.clear();
  });

  it('should accept a decimal point using comma', () => {
    const input = cy.get('#digit-only-decimal-comma');
    input.type('1s2d4d*(,.3').should('have.value', '124,3');
    input.type('.3').should('have.value', '124,33');
    input.type(',6').should('have.value', '124,336');
    input
      .type('{leftarrow}{leftarrow}{leftarrow},5')
      .should('have.value', '124,5336');
    input
      .type('{leftarrow}{leftarrow}{del}{rightarrow}7,')
      .should('have.value', '12457,336');
    input.clear();
  });

  it('should accept a decimal point using comma', () => {
    const input = cy.get('#digit-only-decimal-comma');
    input.type('1s2d4d*(,.3').should('have.value', '124,3');
    input.type('.3').should('have.value', '124,33');
    input.type(',6').should('have.value', '124,336');
    input
      .type('{leftarrow}{leftarrow}{leftarrow},5')
      .should('have.value', '124,5336');
    input
      .type('{leftarrow}{leftarrow}{del}{rightarrow}7,')
      .should('have.value', '12457,336');
    input.clear();
  });

  it('should know the max length: 1', () => {
    const input = cy.get('#digit-only-with-max-length');
    input.type('1s2d4d*(,.3').should('have.value', '124');
    input.clear();
  });

  it('should know the max length: 2', () => {
    const input = cy.get('#creditcard_number');
    input.type('1s2d4d*(,.3').should('have.value', '124');
    input.clear();
  });

  it('should know the max length: 3', () => {
    const input = cy.get('#decimal-number');
    input.type('1s2d4d*(,.35').should('have.value', '124.3');
    input.clear();
  });
});

describe('Copy & Paste', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('should copy and paste in a regular input element', () => {
    const regularInput = cy.get('#regular-text');
    regularInput.type('1s2d4d*(,.35').should('have.value', '1s2d4d*(,.35');
    regularInput.type('{selectall}');
    // regularInput.type('{cmd}c');
    // document.execCommand('copy'); // not working
    regularInput.clear();
    // document.execCommand('paste');// not working
    // regularInput.type('{cmd}v');
    // regularInput.should('have.value', '1s2d4d*(,.35');
    regularInput.clear();
  });
});
