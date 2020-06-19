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
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
      },
    }).as("identify");

    cy.visit(Cypress.config("baseUrl"));
  });

  it("shows name/confidence when person is recognized", () => {
    cy.route({
      method: "POST",
      url: "/identify",
      response: {
        name: "Joe",
        confidence: 23.652345,
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
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
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
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
