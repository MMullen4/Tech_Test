// develop a component test for Quiz.tsx
import React from "react";
import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
  beforeEach(() => {
    // mount the component before each test
    cy.mount(<Quiz />);
  });

  it("renders the Quiz component", () => {
    // check if the component renders
    cy.get("[data-cy=quiz]").should("exist");
  });

  it("displays the quiz questions", () => {
    // verify if the quiz questions are present
    cy.get("[data-cy=quiz-question]").should("be.visable");
  });

  it("allows the user to select an answer", () => {
    // simulate selecting an answer
    cy.get("[data-cy=quiz-answer]").first().click();
    cy.get("[data-cy=quiz-answer]").first().should("have.class", "selected");
  }); 
  
  it("shows the submit button", () => {
    // check if the submit button exists & is enabled
    cy.get('[data-testid="submit-button"]')
      .should("exist")
      .and("be.enabled");
  });

  it("handles form submission", () => {
    // simulate form submission
    cy.get('[data-testid="answer-option"]').first().click();
    cy.get("[data-testid=submit-button]").click();
    // verify if the form submission is handled correctly
    cy.get('[data-testid="feedback"]').should("be.visible");
  });

  it("displays score after completion", () => {
    //complete quiz & check score display
    cy.get('[data-testid="score"]').should("exist");
  });
});
