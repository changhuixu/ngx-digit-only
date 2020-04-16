// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'paste',
  {
    prevSubject: true,
  },
  paste
);

/**
 * Simulates a paste event.
 *
 * @param subject A jQuery context representing a DOM element.
 * @param pasteOptions Set of options for a simulated paste event.
 * @param pasteOptions.pastePayload Simulated data that is on the clipboard.
 * @param pasteOptions.simple Determines whether or not to use a simple paste. Use this when there is no paste event bound to the element
 *                              resolved by the selector.
 * @param pasteOptions.pasteFormat The format of the simulated paste payload. Default value is 'text'.
 *
 * @returns The subject parameter.
 *
 * @example
 * cy.get('some-selector').paste({
 *  pastePayload: 'abc',
 *  simple: false,
 *  });
 */
export function paste(
  subject: JQuery<HTMLInputElement>,
  { pastePayload = '', simple = false }
) {
  if (simple) {
    subject[0].value = pastePayload;
    return;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
  const dt = new DataTransfer();
  dt.setData('text/plain', pastePayload);
  const pasteEvent = new ClipboardEvent('paste', {
    clipboardData: dt,
    bubbles: true,
    cancelable: true,
  });
  subject[0].dispatchEvent(pasteEvent);
  return subject;
}
