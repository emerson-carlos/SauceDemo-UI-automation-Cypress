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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logar', (usuario, senha) => {
    cy.visit('/')
    cy.get('#user-name').type(usuario)
    cy.get('#password').type(senha)
    cy.get('#login-button').click()
})

Cypress.Commands.add('validaPaginaProdutos', ()=>{
    cy.contains('span', 'Products').should('be.visible').should('have.text', 'Products')
})

Cypress.Commands.add('logarComSucesso', () => {
    cy.logar('standard_user', 'secret_sauce')
})

Cypress.Commands.add('adicionarProdutoNoCarrinho', (seletorProduto, nomeProduto, quantidadeNoCarrinho) => {
    cy.get(seletorProduto).click()
    cy.get('.shopping_cart_badge').should('have.text', quantidadeNoCarrinho)
    cy.get('.shopping_cart_link').click()
    cy.contains('span', 'Your Cart').should('be.visible').should('have.text', 'Your Cart')
    cy.contains('div', nomeProduto).should('be.visible').should('have.text', nomeProduto)
})

Cypress.Commands.add('textoVisivel', (seletor, texto) => {
    cy.contains(seletor, texto).should('be.visible').should('have.text', texto)
})

Cypress.Commands.add('naoExiste', (seletor, texto) => {
    cy.get(seletor).contains(texto).should('not.exist')
})

Cypress.Commands.add('acessarPaginaCheckout', () => {
    cy.get('.shopping_cart_link').click()
    cy.textoVisivel('span', 'Your Cart')
    cy.get('#checkout').click()
    cy.get('.title').should('be.visible').should('have.text', 'Checkout: Your Information')
})

Cypress.Commands.add('informacoesCheckout', (nome, sobrenome, codigoPostal) => {
    cy.get('#first-name').type(nome)
    cy.get('#last-name').type(sobrenome)
    cy.get('#postal-code').type(codigoPostal)
    cy.get('#continue').click()
})

Cypress.Commands.add('compraOverview', () => {
    cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-bolt-t-shirt', 'Sauce Labs Bolt T-Shirt', '1')
    cy.acessarPaginaCheckout()
    cy.informacoesCheckout('Caio', 'Duarte', '0694857')
    cy.get('.title').should('be.visible').should('have.text', 'Checkout: Overview')
})