/// <reference types="cypress" />

context("Face Rec Card", () => {
  Cypress.Commands.add("requestsCount", (alias) =>
    cy
      .wrap()
      .then(
        () => cy.state("requests").filter((req) => req.alias === alias).length
      )
  );

  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    cy.server();
    cy.route({
      method: "GET",
      url: "/status",
      response: {
        status: "up",
        tensorflowGpu: false,
        tensorflowVersion: "1.15.3",
      },
    });

    cy.route({
      method: "POST",
      url: "/identify",
      response: {
        name: "FaceRecCard",
        confidence: 23.652345,
        framed_image:
          "UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoBAAEAAgA0JaACdLoAA5gA/vmTb/+QH/+QH/+QH/8gP+IXexhQAA==",
      },
    }).as("identify");
  });

  it("shows name/confidence when person is recognized", () => {
    cy.route({
      method: "POST",
      url: "/identify",
      response: {
        name: "Joe",
        confidence: 23.652345,
        framed_image:
          "UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoBAAEAAgA0JaACdLoAA5gA/vmTb/+QH/+QH/+QH/8gP+IXexhQAA==",
      },
    }).as("identify");

    // should be hitting identify endpoint
    cy.wait("@identify");
    cy.get("[data-testid=user_name]").should("be", "Name: Joe");
    cy.get(
      ":nth-child(1) > .MuiPaper-root > .MuiCardContent-root > :nth-child(2)"
    ).should("be", "Confidence: 23.65%");
  });

  it("shows name/confidence when person is not recognized", () => {
    cy.route({
      method: "POST",
      url: "/identify",
      response: {
        name: "FaceRecCard",
        confidence: 23.652345,
        framed_image:
          "UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoBAAEAAgA0JaACdLoAA5gA/vmTb/+QH/+QH/+QH/8gP+IXexhQAA==",
      },
    }).as("identify");

    cy.get('[type="submit"] > .MuiButton-label').click();
    cy.get(".MuiFormHelperText-root").should("contain", "Name is required");

    // should be hitting identify endpoint
    cy.wait("@identify");
    cy.requestsCount("identify").should("be.greaterThan", 0);
    cy.requestsCount("recording").should("be", 0);
  });
});
