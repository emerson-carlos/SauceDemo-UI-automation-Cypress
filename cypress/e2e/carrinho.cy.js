/// <reference types="cypress" />

describe('carrinho de compras', () => {

    beforeEach(() => {
        cy.logarComSucesso()
    })

    it('deve acessar a página do carrinho de compras', () => {
        cy.get('.shopping_cart_link').click()
        cy.textoVisivel('span', 'Your Cart')
    })

    it('deve adicionar um produto no carrinho de compras na página de produtos', () => {
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-bolt-t-shirt', 'Sauce Labs Bolt T-Shirt', '1')
    })

    it('deve remover um produto no carrinho de compras na página de produtos', ()=>{
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-bolt-t-shirt', 'Sauce Labs Bolt T-Shirt', '1')
        cy.get('#continue-shopping').click()
        cy.textoVisivel('span', 'Products')
        cy.get('#remove-sauce-labs-bolt-t-shirt').click()
        cy.naoExiste('.shopping_cart_container', '1')
    })

    it('deve adicionar um produto no carrinho de compras de sua página de informações', ()=>{
        cy.contains('div', 'Sauce Labs Fleece Jacket').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Fleece Jacket')
        cy.get('#add-to-cart').click()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        cy.get('.shopping_cart_link').click()
        cy.textoVisivel('span', 'Your Cart')
        cy.get('.inventory_item_name').should('be.visible').should('have.text', 'Sauce Labs Fleece Jacket')
    })

    it('deve remover um produto do carrinho de compras na sua página de informações', ()=>{
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-bike-light', 'Sauce Labs Bike Light', '1')
        cy.get('.inventory_item_name').click()
        cy.get('.inventory_details_name').should('be.visible').should('have.text', 'Sauce Labs Bike Light')
        cy.get('#remove').click()
        cy.naoExiste('.shopping_cart_container', '1')
    })

    it('deve remover um produto do carrinho de compras a partir da página do carrinho', ()=>{
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-bike-light', 'Sauce Labs Bike Light', '1')
        cy.get('#remove-sauce-labs-bike-light').click()
        cy.naoExiste('.shopping_cart_container', '1')
    })

    it('deve adicionar mais de um produto ao carrinho de compras', ()=>{
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-backpack', 'Sauce Labs Backpack', '1')
        cy.get('#continue-shopping').click()
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-onesie', 'Sauce Labs Onesie', '2')
    })

    it('deve remover um produto de uma lista de produtos no carrinho de compras', ()=>{
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-backpack', 'Sauce Labs Backpack', '1')
        cy.get('#continue-shopping').click()
        cy.adicionarProdutoNoCarrinho('#add-to-cart-sauce-labs-onesie', 'Sauce Labs Onesie', '2')
        cy.get('#remove-sauce-labs-backpack').click()
        cy.naoExiste('.cart_list', 'Sauce Labs Backpack')
        cy.get('.shopping_cart_badge').should('have.text', '1')
    })
})