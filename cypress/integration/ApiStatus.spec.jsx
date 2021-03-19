/// <reference types="cypress" />

context("API Status", () => {
  const getAliasCount = (alias) => {
    // implementation details, use at your own risk
    const testRoutes = cy.state('routes')
    const aliasRoute = Cypress._.find(testRoutes, { alias })
  
    if (!aliasRoute) {
      return
    }
  
    return Cypress._.keys(aliasRoute.requests || {}).length
  }

  it("checks if api is available on loading", () => {
    cy.intercept("/status", {
      status: "up",
      tensorflowGpu: false,
      tensorflowVersion: "1.15.3"
    }).as("status");

    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"])
      .then(() => {
        expect(getAliasCount('status')).to.be.greaterThan(0)
      })
  })

  it("shows offline alert if api is offline", () => {
    cy.intercept("/status").as("status");

    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.get("[data-testid=offlineAlert]").should("exist");
  });

  it("counts down until next retry", () => {
    cy.intercept("/status").as("status");

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
    cy.intercept("/status").as("status");
    cy.visit(Cypress.config("baseUrl"));
    cy.wait(["@status"]);
    cy.get("[data-testid=offlineAlert]").should("exist");
    cy.get(".MuiAlert-message").should("contain", "trying again in ");

    cy.intercept('GET', "/status", {
      status: "up",
      tensorflowGpu: false,
      tensorflowVersion: "1.15.3"
    }).as("status");

    // wait for next ping to endpoint
    cy.wait(["@status"], { requestTimeout: 15000 }).then(() => {
      cy.get("[data-testid=offlineAlert]").should("not.exist");
    });
  });
});
