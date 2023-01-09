import {
  ERROR_EMAIL,
  ERROR_PASSWORD,
  INCORRECT_EMAIL_WARNING,
  INCORRECT_PASSWORD_WARNING,
  USER_EMAIL,
  USER_PASSWORD,
} from '../support/constants'

describe('Test login', () => {
  it('should click login button and open the login modal', () => {
    cy.clickButtonAndOpenLoginModal()
  })

  it('should output errors when the user enters incorrect data', () => {
    cy.clickButtonAndOpenLoginModal()

    cy.get('form[data-cy="login-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="login-email"]')
        .type(ERROR_EMAIL)
        .should('have.value', ERROR_EMAIL)
        .blur()
      cy.root().contains(INCORRECT_EMAIL_WARNING).should('exist')

      cy.root()
        .find('input[data-cy="login-password"]')
        .type(ERROR_PASSWORD)
        .should('have.value', ERROR_PASSWORD)
        .blur()

      cy.root().contains(INCORRECT_PASSWORD_WARNING).should('exist')
    })
  })

  it('should successfully submit the login form', () => {
    cy.clickButtonAndOpenLoginModal()

    cy.get('form[data-cy="login-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="login-email"]')
        .clear()
        .type(USER_EMAIL)
        .should('have.value', USER_EMAIL)
      cy.root().contains(INCORRECT_EMAIL_WARNING).should('not.exist')

      cy.root()
        .find('input[data-cy="login-password"]')
        .clear()
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)
      cy.root().contains(INCORRECT_PASSWORD_WARNING).should('not.exist')

      cy.root().submit()
      cy.location('pathname').should('eq', '/profile')
    })
  })
})
