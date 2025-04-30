describe("Quiz Application", () => {
  beforeEach(() => {
    cy.visit("/quiz");
  });

  it("should load the quiz page successfully", () => {
    // check if the main container exists
    cy.get('[data-testid="quiz-contain"]').should("exist");
    cy.get('[data-testid="quiz-title"]').should("be.visable");
  });

  it("should display the quiz questions one at a time", () => {
    cy.get('[data-testid="question"]').should("be.visable");
    cy.get('[data-testid="question-number"]').should("contain", "1");
  });

  it("should allow the user to select an answer", () => {
    cy.get('[data-testid="answer-options"]')
      .find('input[type="radio"]')
      .first()
      .check()
      .should("be.checked");
  });

  it("should validate answer submission", () => {
    // select an answer
    cy.get('[data-testid="answer-options"]')
      .find('input[type="radio"]')
      .first()
      .check();

    // sumbit answer
    cy.get('[data-testid="submit-answer"]').click();

    // verify feedback is displayed
    cy.get('[data-testid="feedback"]').should("be.visible");
  });

  it("should navigete through all questions", () => {
    const answerQuestion = () => {
      cy.get('[data-testid="answer-options"]')
        .find('input[type="radio"]')
        .first()
        .check();

      cy.get('[data-testid="submit-answer"]').click();
      cy.get('[data-testid="next-question"]').click();
    };

    // answer multiple questions
    for (let i = 0; i < 10; i++) {
      answerQuestion();
    }

    // verify progress
    cy.get('[data.testid="progress-indicator"]').should("exist");
  });

  it("should display final score at end", () => {
    // function to complete quiz
    const completeQuiz = () => {
      const totalQuestions = 5; // Adjust the total number of questions as needed

      for (let i = 0; i < totalQuestions; i++) {
        answerQuestion();

        cy.get('[data-testid="answer-options"]')
          .find('input[type="radio"]')
          .first()
          .check();
        cy.get('[data-testid="submit-answer"]').click();

        if (i < totalQuestions - 1)
          cy.get('[data-testid="next-question"]').click();
      }
    };

    completeQuiz();
    cy.get('[data-testid="final-score"]').should("be.visible");
    cy.get('[data-testid="retry-quiz"]').should("be.visible");
  });

  it("should handle accessibility requirements", () => {
    // check for ARIA lables
    cy.get('[data.testid="question"]').should("have.attr", "aria-label");

    // verify keyboard nav
    cy.get('[data-testid="answer-options"]')
      .find('input[type="radio"]')
      .first()
      .focus()
      .should("have.focus")
      .type("{enter}")
      .should("be.checked");
  });

  it("should persist quiz state on page reload", () => {
    // answer a question
    cy.get('[data-testid="answer-options"]')
      .find('input[type="radio"]')
      .first()
      .check();
    cy.get('[data-testid="submit-answer"]').click();

    // reload the page
    cy.reload();

    // verify progress was saved
    cy.get('[data-testid="progress-indicator"]')
      .should('contain', '1');
  });

  it('shoudl handle error states gracefully', () => {
    // test submission w/o selecting an answer
    cy.get('[data-testid="submit-answer"]').click();
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Please select an answer before submitting.');
  });
});
