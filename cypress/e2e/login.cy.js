/// <reference types="cypress" />

describe('login', () => {
    it('deve fazer login com sucesso', () => {
        cy.logar('standard_user', 'secret_sauce')
        cy.validaPaginaProdutos()
    })

    it('não deve fazer login com usuário não cadastrado', () => {
        cy.logar('usuario', 'secret_sauce')
        cy.get('.error-message-container h3')
            .should('be.visible')
            .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('não deve fazer login com senha de usuário inválida', () => {
        cy.logar('standard_user', 'senha')
        cy.get('.error-message-container h3')
            .should('be.visible')
            .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('não deve fazer login sem informar usuário e senha', () => {
        cy.logar('{backspace}', '{backspace}')
        cy.get('.error-message-container h3')
            .should('be.visible')
            .should('have.text', 'Epic sadface: Username is required')
    })

    it('não deve fazer login sem informar usuário', () => {
        cy.logar('{backspace}', 'secret_sauce')
        cy.get('.error-message-container h3')
            .should('be.visible')
            .should('have.text', 'Epic sadface: Username is required')
    })

    it('não deve fazer login sem informar senha', () => {
        cy.logar('standard_user', '{backspace}')
        cy.get('.error-message-container h3')
            .should('be.visible')
            .should('have.text', 'Epic sadface: Password is required')
    })

    it('deve remover mensagem de erro da tela pelo botão', () => {
        cy.logar('{backspace}', '{backspace}')
        cy.get('.error-button').click()
        cy.naoExiste('#login_button_container', 'Epic sadface: Username is required')
    })
})