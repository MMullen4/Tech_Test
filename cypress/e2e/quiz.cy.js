describe("Quiz Application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("should load the quiz page successfully", () => {
    // check if the main container exists
    cy.visit(`http://localhost:3001/`);
    cy.findByRole("document", { name: "" }).should("exist");
    cy.findByRole("button", { name: "Start Quiz" }).should("be.visible");
  });

  it("should display the quiz questions one at a time", () => {
    // Start the quiz first
    cy.findByRole("button", { name: "Start Quiz" }).click();

    // Find question by its role
    cy.findByRole("button", { name: "1" }).should("be.visible");
    cy.findByRole("button", { name: "2" }).should("be.visible");
    cy.findByRole("button", { name: "3" }).should("be.visible");
    cy.findByRole("button", { name: "4" }).should("be.visible");

    //check if 1st question is displayed
    cy.get('[data-testid="question"]').should("be.visible");
  
  });

  it("should allow the user to select an answer", () => {
    // start the quiz
    cy.findByRole("button", { name: "Start Quiz" }).click();

    // select an answer
    cy.get('[data-testid="quiz-container"]')
      .find('input[type="radio"]')
      .first()
      .check();
  });

  it("should validate answer submission", () => {
    // select an answer
    cy.get('[data-testid="answer-options"]')
      .find('input[type="radio"]')
      .first()
      .check();

    // submit answer
    cy.get('[data-testid="submit-answer"]').click();

    // verify feedback is displayed
    cy.get('[data-testid="feedback"]').should("be.visible");
  });

  it("should navigate through all questions", () => {
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
    cy.get('[data-testid="progress-indicator"]').should("exist");
  });

  it("should display final score at end", () => {
    // function to complete quiz
    const completeQuiz = () => {
      const totalQuestions = 5; // Adjust the total number of questions as needed

      for (let i = 0; i < totalQuestions; i++) {
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
    // check for ARIA labels
    cy.get('[data-testid="question"]').should("have.attr", "aria-label");

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
    cy.get('[data-testid="progress-indicator"]').should("contain", "1");
  });

  it("should handle error states gracefully", () => {
    // test submission w/o selecting an answer
    cy.get('[data-testid="submit-answer"]').click();
    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Please select an answer before submitting.");
  });
});
