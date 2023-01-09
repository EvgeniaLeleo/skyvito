import {
  INCORRECT_EMAIL_WARNING,
  INCORRECT_PASSWORD_WARNING,
  TAKEN_EMAIL_WARNING,
  USER_DATA,
  USER_EMAIL,
  USER_PASSWORD,
} from './constants'

Cypress.Commands.add('clickButtonAndOpenLoginModal', () => {
  cy.visit('/')

  cy.get('button')
    .contains('Вход в личный кабинет')
    .should('exist')
    .as('Button')
  cy.get('@Button').click()

  cy.get('form[data-cy="login-modal"]').should('exist')
  cy.get('form[data-cy="login-modal"]').within(() => {
    cy.root().find('input').should('have.length', 2)
    cy.root().find('button').should('have.length', 2)
    cy.get('button').contains('Войти').should('exist')
    cy.get('button').contains('Зарегистрироваться').should('exist')
  })
})

Cypress.Commands.add('clickButtonAndOpenSignupModal', () => {
  cy.clickButtonAndOpenLoginModal()

  cy.get('button').contains('Зарегистрироваться').should('exist').as('Button')
  cy.get('@Button').click()

  cy.get('form[data-cy="signup-modal"]').should('exist')
  cy.get('form[data-cy="signup-modal"]').within(() => {
    cy.root().find('input').should('have.length', 6)
    cy.root().find('button').should('have.length', 1)
    cy.get('button').contains('Зарегистрироваться').should('exist')
  })
})

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.clickButtonAndOpenLoginModal()

  cy.get('form[data-cy="login-modal"]').within(() => {
    cy.root()
      .find('input[data-cy="login-email"]')
      .clear()
      .type(email)
      .should('have.value', email)
    cy.root().contains(INCORRECT_EMAIL_WARNING).should('not.exist')

    cy.root()
      .find('input[data-cy="login-password"]')
      .clear()
      .type(password)
      .should('have.value', password)
    cy.root().contains(INCORRECT_PASSWORD_WARNING).should('not.exist')

    cy.root().submit()
    cy.location('pathname').should('eq', '/profile')
  })
})

Cypress.Commands.add(
  'successfulSubmitSignupForm',
  (
    email: string,
    password: string,
    name: string,
    surname: string,
    city: string
  ) => {
    cy.clickButtonAndOpenSignupModal()

    cy.get('form[data-cy="signup-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="signup-email"]')
        .clear()
        .type(email)
        .should('have.value', email)
      cy.root().contains(INCORRECT_EMAIL_WARNING).should('not.exist')

      cy.root()
        .find('input[data-cy="signup-password"]')
        .clear()
        .type(password)
        .should('have.value', password)
      cy.root().contains(INCORRECT_PASSWORD_WARNING).should('not.exist')

      cy.root()
        .find('input[data-cy="signup-confirmPassword"]')
        .type(password)
        .should('have.value', password)

      cy.root()
        .find('input[data-cy="signup-name"]')
        .type(name)
        .should('have.value', name)

      cy.root()
        .find('input[data-cy="signup-surname"]')
        .type(surname)
        .should('have.value', surname)

      cy.root()
        .find('input[data-cy="signup-city"]')
        .type(city)
        .should('have.value', city)

      cy.root().submit()
      cy.root().contains(TAKEN_EMAIL_WARNING).should('not.exist')
      cy.location('pathname').should('eq', '/profile')
    })
  }
)

Cypress.Commands.add(
  'changeUserSettings',
  (parameter: 'name' | 'surname' | 'city') => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('form').within(() => {
      cy.root()
        .find('button')
        .contains('Сохранить')
        .should('exist')
        .should('be.disabled')
        .as('Button')

      cy.root().find(`input[data-cy="settings-${parameter}"]`).as('Input')

      cy.get('@Input').clear().should('have.value', '')
      cy.get('@Button').should('not.be.disabled')
      cy.get('@Button').click()

      cy.get('@Input').should('have.value', '')
      cy.get('@Button').should('be.disabled')

      cy.get('@Input')
        .type(USER_DATA[parameter])
        .should('have.value', USER_DATA[parameter])
      cy.get('@Button').should('not.be.disabled')
      cy.get('@Button').click()

      cy.get('@Input').should('have.value', USER_DATA[parameter])
      cy.get('@Button').should('be.disabled')
    })
  }
)
