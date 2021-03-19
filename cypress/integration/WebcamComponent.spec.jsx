/// <reference types="cypress" />

context("Webcam component", () => {
  beforeEach(() => {
    cy.intercept(
      "/identify",
      {
        name: "WebcamComponent",
        confidence: 90.0,
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
      }
    ).as("identify");
  });

  it("adjusts framerate & resolution when tensorflow runs on GPU", () => {
    cy.intercept(
      "/status",
      {
        status: "up",
        tensorflowGpu: true,
        tensorflowVersion: "1.15.3",
      }
    ).as("status");
    cy.visit(Cypress.config("baseUrl"));

    // should be hitting identify endpoint
    cy.wait("@status");
    
    cy.get("[data-testid=webcam-component] > :nth-child(1)")
    .invoke('text')
    .should('equal', "Frame rate: 20 fps")

    cy.get("[data-testid=webcam-component] > :nth-child(2)")
    .invoke('text')
    .should('equal', "Frame width: 640px")
  });

  it("adjusts framerate & resolution when tensorflow runs on CPU", () => {
    // Running on CPU
    cy.intercept(
      "/status",
      {
        status: "up",
        tensorflowGpu: false,
        tensorflowVersion: "1.15.3",
      }
    ).as("status");
    cy.visit(Cypress.config("baseUrl"));

    // should be hitting identify endpoint
    cy.wait("@status");
    cy.get("[data-testid=webcam-component] > :nth-child(1)")
    .invoke('text')
    .should('equal', "Frame rate: 5 fps")
    
    cy.get("[data-testid=webcam-component] > :nth-child(2)")
    .invoke('text')
    .should('equal', "Frame width: 250px")
  });
});
