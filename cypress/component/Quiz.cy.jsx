// develop a component test for Quiz.tsx
import React from 'react'
// import { mount } from 'cypress-react-unit-test';
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

  it('displays the final score element after quiz completion', () => {
    // Start the quiz
    cy.get(`[data-testid="start-quiz-button"]`).click()

    // Complete all questions by answering them
    const completeQuiz = () => {
      // Check if there are more questions to answer
      cy.get('body').then($body => {
        if ($body.find('[data-testid="quiz-completed"]').length > 0) {
          // Quiz is already completed, proceed to assertions
          return
        }

        // Answer the current question
        cy.get(`[data-testid^="answer-option-"]`).first().click()
        cy.wait(300) // Wait for next question to load

        // Recursively continue answering questions
        completeQuiz()
      })
    }

    completeQuiz()

    // After quiz completion, verify the final score is visible
    cy.get(`[data-testid="final-score"]`)
      .should('exist')
      .and('be.visible')
      .and('contain', 'Your score:') // Assuming the score element contains the text "Score:"
  })
})
