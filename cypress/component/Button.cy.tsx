// button component test

import Button from "../../client/src/components/Button";

describe("Button Component", () => {
  it("renders correctly", () => {
    cy.mount(<Button>Click me</Button>);
    cy.get("button").should("exist");
    cy.get("button").should("have.text", "Click me");
  });
});
