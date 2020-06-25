/// <reference types="cypress" />

context("API Status", () => {
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
      url: "/status",
    }).as("status");
  });

  it("checks if api is available on loading", () => {
    cy.route({
      url: "/status",
      response: {
        status: "up",
        tensorflowGpu: false,
        tensorflowVersion: "1.15.3",
      },
    }).as("status");

    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.requestsCount("status").should("be.greaterThan", 0);
  });

  it("shows offline alert if api is offline", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.get("[data-testid=offlineAlert]").should("exist");
  });

  it("counts down until next retry", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.get("[data-testid=offlineAlert]").should("exist");

    cy.get(".MuiAlert-message").then(($val) => {
      const initialValue = $val.text();

      cy.wait(2000);

      cy.get(".MuiAlert-message").then(($val) => {
        const finalValue = $val.text();
        expect(initialValue).not.to.eq(finalValue);
      });
    });
  });

  it("hides offline alert when api is back online", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.get("[data-testid=offlineAlert]").should("exist");
    cy.get(".MuiAlert-message").should("contain", "trying again in ");

    cy.route({
      url: "/status",
      response: {
        status: "up",
        tensorflowGpu: false,
        tensorflowVersion: "1.15.3",
      },
    }).as("status");

    // wait for next ping to endpoint
    cy.wait(["@status"], { requestTimeout: 15000 }).then(() => {
      cy.get("[data-testid=offlineAlert]").should("not.exist");
    });
  });
});
