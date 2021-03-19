/// <reference types="cypress" />

context("Face Rec Card", () => {
  const getAliasCount = (alias) => {
    // implementation details, use at your own risk
    const testRoutes = cy.state('routes')
    const aliasRoute = Cypress._.find(testRoutes, { alias })
  
    if (!aliasRoute) {
      return
    }
  
    return Cypress._.keys(aliasRoute.requests || {}).length
  }

  beforeEach(() => {
    cy.intercept("/status", {
      status: "up",
      tensorflowGpu: false,
      tensorflowVersion: "1.15.3"
    }).as("status");

    cy.visit(Cypress.config("baseUrl"));
  });

  it("shows name/confidence when person is recognized", () => {
    cy.intercept(
      "/identify",
      {
        name: "Joe",
        confidence: 23.652345,
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
      }
    ).as("identify");

    // should be hitting identify endpoint
    cy.wait(["@identify"]);
    cy.get("[data-testid=user_name]")
    .invoke('text')
    .should('equal', "Name: Joe")
    
    cy.get(":nth-child(1) > .MuiPaper-root > .MuiCardContent-root > :nth-child(2)")
    .invoke('text')
    .should('equal', "Confidence: 23.65%")
  });

  it("does not display name when person not recognized", () => {
    cy.intercept(
      "/identify",
      {}
    ).as("identify");

    cy.wait(["@identify"]);
    cy.get("[data-testid=user_name]")
    .invoke('text')
    .should('equal', "Name: ")
    
    cy.get(":nth-child(1) > .MuiPaper-root > .MuiCardContent-root > :nth-child(2)")
    .invoke('text')
    .should('equal', "Confidence: ")
  });
});
