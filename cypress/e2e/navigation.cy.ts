// navigation e2e test

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to main page", () => {
    cy.url().should("include", "/");
    cy.get("nav").should("be.visible");
  });
});
