/// <reference types="cypress" />

describe('lightbox.html', () => {

    beforeEach(() => {
        cy.visit('../../lightbox.html')
    })

    // 1
    it('Ouvre la lightbox au clic sur l’image', () => {

        cy.get('img').first().click()

        cy.get('#lightbox')
            .should('be.visible')
    })

    // 2
    it('Ferme la lightbox au clic en dehors', () => {

        cy.get('img').first().click()

        cy.get('#lightbox').should('be.visible')

        cy.get('.fixed').click('topLeft')

        cy.get('#lightbox')
            .should('not.be.visible')
    })

    // 3
    it('Ajoute un j’aime et met à jour les compteurs', () => {
        
        cy.get('img').first().click()
        
        // icône coeur vide
        cy.get('svg[title="Like"]').click()
        
        // compteur dans la lightbox
        cy.get('#lightbox')
            .contains('1')
        
        // compteur overlay
        
        cy.get('.fixed').click('topLeft')
        
        cy.get('.absolute')
            .contains('1')
    })

    // 4
    it('Retire un j’aime et remet les compteurs à zéro', () => {
        
        cy.get('img').first().click()
        
        cy.get('svg[title="Like"]').click()
        cy.get('svg[title="Dislike"]').click()
        
        cy.get('#lightbox')
            .contains('0')
        
        cy.get('.absolute')
            .contains('0')
    })

    // 5
    it('Ajoute un commentaire', () => {

        cy.get('img').first().click()

        cy.get('input[name="comment"]')
            .type('Cypress is awesome!')

        cy.contains('Publish').click()

        cy.contains('Cypress is awesome!')
            .should('exist')

        cy.contains('johndoe')
            .should('exist')
    })

    // 6
    it('Empêche la publication d’un commentaire vide', () => {

        cy.get('img').first().click()

        cy.get('button')
            .contains('Publish')
            .should('be.disabled')
    })

    // 7
    it('Cache les commentaires', () => {

        cy.get('img').first().click()

        cy.get('input[name="comment"]').type('Premier commentaire')
        cy.contains('Publish').click()

        cy.contains('Hide 1 comment')
            .click()

        cy.contains('Show 1 comment')
            .should('exist')
    })

    // 8
    it('Met à jour les compteurs de commentaires', () => {
        
        cy.get('img').first().click()
        
        cy.get('input[name="comment"]').type('Commentaire')
        cy.contains('Publish').click()
        
        cy.contains('Hide 1 comment')
        cy.get('.absolute')
            .contains('1')
        cy.get('div.fixed').click();
        cy.get('div.fixed').click();
        cy.get('div.fixed').click();
        cy.get('div.fixed').click();
    })

    // 9
    it('Gère le singulier/pluriel', () => {

        cy.get('img').first().click()

        cy.get('input[name="comment"]').type('Premier')
        cy.contains('Publish').click()

        cy.contains('Hide 1 comment')

        cy.get('input[name="comment"]').type('Deuxième')
        cy.contains('Publish').click()

        cy.contains('Hide 2 comments')
    })

    // 10
    it('Supprime le deuxième commentaire', () => {

        cy.get('img').first().click()

        const commentaires = [
            'Commentaire 1',
            'Commentaire 2',
            'Commentaire 3'
        ]

        commentaires.forEach(c => {
            cy.get('input[name="comment"]').type(c)
            cy.contains('Publish').click()
        })

        cy.contains('Commentaire 2')
            .parents('.flex.items-center.justify-between')
            .find('svg[title="Supprimer le commentaire"]')
            .click()

        cy.contains('Commentaire 2')
            .should('not.exist')

        cy.contains('Commentaire 1')
            .should('exist')

        cy.contains('Commentaire 3')
            .should('exist')

        cy.contains('Hide 2 comments')
    })

})