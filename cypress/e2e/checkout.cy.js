/// <reference types="cypress" />

describe("checkout", () => {

    beforeEach(() => {
        cy.logarComSucesso()
    })

    it('deve cancelar o checkout', () => {
        cy.acessarPaginaCheckout()
        cy.get('#cancel').click()
        cy.get('.title').should('be.visible').should('have.text', 'Your Cart')
    })

    it('não deve permitir checkout sem informar o nome', () => {
        cy.acessarPaginaCheckout()
        cy.informacoesCheckout('{backspace}', 'Duarte', '0694857')
        cy.contains('h3', 'Error: First Name is required').should('be.visible').should('have.text', 'Error: First Name is required')
    })

    it('não deve permitir checkout sem informar o sobrenome', () => {
        cy.acessarPaginaCheckout()
        cy.informacoesCheckout('Caio', '{backspace}', '0694857')
        cy.contains('h3', 'Error: Last Name is required').should('be.visible').should('have.text', 'Error: Last Name is required')
    })

    it('não deve permitir checkout sem informar o código postal', () => {
        cy.acessarPaginaCheckout()
        cy.informacoesCheckout('Caio', 'Duarte', '{backspace}')
        cy.contains('h3', 'Error: Postal Code is required').should('be.visible').should('have.text', 'Error: Postal Code is required')
    })

    it('deve remover mensagem de erro da tela pelo botão', () => {
        cy.acessarPaginaCheckout()
        cy.informacoesCheckout('{backspace}', '{backspace}', '{backspace}')
        cy.contains('h3', 'Error: First Name is required').should('be.visible').should('have.text', 'Error: First Name is required')
        cy.get('.error-button').click()
        cy.naoExiste('.checkout_info', 'Error: First Name is required')
    })

    it('deve cancelar uma compra', () => {
        cy.compraOverview()
        cy.get('#cancel').click()
        cy.validaPaginaProdutos()
        cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    it('deve realizar uma compra', () => {
        cy.compraOverview()
        cy.contains('div', 'Sauce Labs Bolt T-Shirt').should('be.visible').should('have.text', 'Sauce Labs Bolt T-Shirt')
        cy.contains('div', 'Payment Information:').should('be.visible').should('have.text', 'Payment Information:')
        cy.contains('div', 'SauceCard #31337').should('be.visible').should('have.text', 'SauceCard #31337')
        cy.contains('div', 'Shipping Information:').should('be.visible').should('have.text', 'Shipping Information:')
        cy.contains('div', 'Free Pony Express Delivery!').should('be.visible').should('have.text', 'Free Pony Express Delivery!')
        cy.contains('div', 'Price Total').should('be.visible').should('have.text', 'Price Total')
        cy.get('#finish').click()
        cy.contains('h2', 'Thank you for your order!').should('be.visible').should('have.text', 'Thank you for your order!')
    })

    it('deve realizar uma nova compra', () => {
        cy.compraOverview()
        cy.get('#finish').click()
        cy.contains('h2', 'Thank you for your order!').should('be.visible').should('have.text', 'Thank you for your order!')
        cy.get('#back-to-products').click()
        cy.validaPaginaProdutos()
    })
})