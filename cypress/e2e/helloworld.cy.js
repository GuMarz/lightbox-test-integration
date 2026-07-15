/// <reference types="cypress" />

describe('lightbox.html', () => {
  beforeEach(() => {
    cy.visit('../../lightbox.html')
  })

    it('should have a heading with Lightbox', () => {
    cy.get('h1').should('have.text', 'Lightbox')
    })

})
