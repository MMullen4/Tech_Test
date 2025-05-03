// develop a component test for Quiz.tsx
// import React from "react";
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
  beforeEach(() => {
    // mount the component before each test
    cy.mount(<Quiz />)
  })

  it('renders the Start Quiz button', () => {
    // check if the component renders
    cy.get(`[data-testid="start-quiz-button"]`)
      .should('exist')
      .and('be.enabled')
  })

  it('displays the quiz container', () => {
    // verify if the quiz container is present
    cy.get(`[data-testid="start-quiz-button"]`).click()
    cy.get(`[data-testid="quiz-container"]`).should('exist').and('be.visible')
  })

  it('displays the quiz questions', () => {
    // verify if the quiz questions are present
    cy.get(`[data-testid="start-quiz-button"]`).click()
    cy.get(`[data-testid="question"]`).should('exist').and('be.visible')
  })

  it('allows the user to select an answer', () => {
    // simulate selecting an answer
    cy.get(`[data-testid="start-quiz-button"]`).click()
    cy.get(`[data-testid^="answer-option-"]`).first().click()
  })

  it('displays quiz complete & score after completion', () => {
    //complete quiz & check score display
    cy.get(`[data-testid="start-quiz-button"]`).click()

    cy.get(`[data-testid="question"]`).each(() => {
      cy.get(`[data-testid^="answer-option-"]`)
        .first()
        .click()
    })

    cy.get(`[data-testid="quiz-completed"]`).should('exist').and('be.visible')
    cy.get(`[data-testid="final-score"]`).should('exist').and('be.visible')
  })
})
