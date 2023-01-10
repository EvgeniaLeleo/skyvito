import {
  NEW_PRODUCT_DESCRIPTION,
  NEW_PRODUCT_PRICE,
  NEW_PRODUCT_TITLE,
  USER_EMAIL,
  USER_PASSWORD,
} from '../support/constants'

describe('Create product modal', () => {
  it('should display create modal', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('nav[data-cy="navigation"]').should('exist').as('Navigation')
    cy.get('@Navigation').within(() => {
      cy.root()
        .find('button')
        .contains('Разместить объявление')
        .as('Button')
        .should('exist')

      cy.get('@Button').click()
    })

    cy.get('form[data-cy="create-modal"]').as('Modal').should('exist')
    cy.get('@Modal').within(() => {
      cy.root().find('input').should('have.length', 7)
      cy.root().find('textarea').should('have.length', 1)
      cy.root().find('button').should('have.length', 1)
      cy.root().find('button').contains('Опубликовать').should('exist')
    })
  })

  it('should successfully submit the signup form', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('button').contains('Разместить объявление').as('Button')
    cy.get('@Button').click()

    cy.get('form[data-cy="create-modal"]').as('Modal').should('exist')
    cy.get('@Modal').within(() => {
      cy.get('button').as('Submit').should('exist')
      cy.get('@Submit').should('be.disabled')

      cy.root()
        .find('input[data-cy="create-title"]')
        .should('have.value', '')
        .type(NEW_PRODUCT_TITLE)
        .should('have.value', NEW_PRODUCT_TITLE)
      cy.get('@Submit').should('be.disabled')

      cy.root()
        .find('textarea[data-cy="create-description"]')
        .should('have.value', '')
        .type(NEW_PRODUCT_DESCRIPTION)
        .should('have.value', NEW_PRODUCT_DESCRIPTION)
      cy.get('@Submit').should('be.disabled')

      cy.root()
        .find('input[data-cy="create-price"]')
        .should('have.value', '')
        .type(NEW_PRODUCT_PRICE)
        .should('have.value', NEW_PRODUCT_PRICE)
      cy.get('@Submit').should('not.be.disabled')

      cy.get('@Submit').click()
    })

    cy.get('h1').contains(NEW_PRODUCT_TITLE).should('exist')
    cy.get('p').contains(NEW_PRODUCT_PRICE).should('exist')
    cy.get('p').contains(NEW_PRODUCT_DESCRIPTION).should('exist')
  })
})
