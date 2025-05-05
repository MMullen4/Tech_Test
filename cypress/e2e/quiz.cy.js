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
    cy.get('[data-testid^="answer-option-"]').first().click();
  });


  it("should navigate through all questions", () => {
    cy.findByRole("button", { name: "Start Quiz" }).click();

    // function to answer a question
    const answerQuestion = () => {
      cy.get('[data-testid^="answer-option-"]').first().click();
    };

    // answer multiple questions
    for (let i = 0; i < 10; i++) {
      answerQuestion();
    }
  });

  it("should display final score at end", () => {
    cy.findByRole("button", { name: "Start Quiz" }).click();

    // wait for the quiz to load
    cy.get(`[data-testid="quiz-container"]`).should("be.visible");

    // function to complete quiz
    const completeQuiz = () => {
      // click 1st choice until we reach the end
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid^="answer-option-"]').length > 0) {
          // click 1st answer
          cy.get('[data-testid="answer-option-0"]').click();

          // recursively call this func to handle next question
          completeQuiz();
        }
      });
    };
    completeQuiz();

    // check if quiz completed screen shows
    cy.get('[data-testid="quiz-completed"]').should("be.visible");

    // check if final score shows
    cy.get('[data-testid="final-score"]').should("be.visible");
    cy.get('[data-testid="final-score"]').should("contain", "Your score:");

    // verify "Take new quiz" button shows
    cy.get('[data-testid="start-quiz-button"]').should("be.visible");
  });
});
