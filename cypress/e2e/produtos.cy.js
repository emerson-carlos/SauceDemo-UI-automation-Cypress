/// <reference types="cypress" />

describe('produtos', () => {

    beforeEach(() => {
        cy.logarComSucesso()
    })

    it('deve acessar informações do produto ao clicar no nome', () => {
        cy.contains('div', 'Sauce Labs Fleece Jacket').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Fleece Jacket')
    })

    it('deve acessar informações do produto ao clicar na imagem', () => {
        cy.get('[data-test="inventory-item-sauce-labs-onesie-img"]').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Onesie')
    })

    it('deve retornar para a página de produtos a partir da página de um produto', () => {
        cy.contains('div', 'Sauce Labs Bike Light').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Bike Light')
        cy.get('#back-to-products').click()
        cy.validaPaginaProdutos()
    })

    it('deve retornar a página de produtos pelo botão na página do carrinho de compras', () => {
        cy.get('.shopping_cart_link').click()
        cy.contains('span', 'Your Cart').should('be.visible').should('have.text', 'Your Cart')
        cy.get('#continue-shopping').click()
        cy.validaPaginaProdutos()
    })

    it('deve acessar informações do produto a partir da página do carrinho de compras', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        cy.get('.shopping_cart_link').click()
        cy.contains('span', 'Your Cart').should('be.visible').should('have.text', 'Your Cart')
        cy.get('.inventory_item_name').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Backpack')
    })
})