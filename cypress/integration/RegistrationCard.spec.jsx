/// <reference types="cypress" />

context("Registration Card", () => {
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
    const delay = 1000

    cy.intercept(
      "/status",
      {
        status: "up",
        tensorflowGpu: false,
        tensorflowVersion: "1.15.3",
      }
    );

    cy.intercept(
      "/identify",
      {
        name: "test",
        confidence: 23.652345,
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
      },
    ).as("identify");

    cy.intercept(
      "/add_person/*",
      {
        bboxes: [{ x: 0, y: 0, w: 0, h: 0 }],
      },
    ).as("recording");
    
    cy.intercept(
      '/train_model', 
      {
        statusCode: 200,
        body: { "training status": "complete" },
        delay
    }).as("trainModel");

    cy.visit(Cypress.config("baseUrl"));
  });

  it("throws validation error if name not entered", () => {
    cy.get('[type="submit"] > .MuiButton-label').click();
    cy.get(".MuiFormHelperText-root").should("contain", "Name is required");

    // should be hitting identify endpoint
    cy.wait("@identify")
    .then(() => {
      expect(getAliasCount('identify')).to.be.greaterThan(0)
      expect(getAliasCount('recording')).to.equal(0)
    })
  });

  it("starts recording if name provided", () => {
    cy.get("[data-testid=newUserName]").type("test user");
    cy.get('[type="submit"] > .MuiButton-label').click();

    // should be hitting recording endpoint
    cy.wait("@recording")
    .then(() => {
      expect(getAliasCount('recording')).to.be.greaterThan(0)
    })
  });

  it("test training model", () => {
    // hit training button
    cy.get("[data-testid=trainingButton] > .MuiButton-label").click();

    // check for spinner
    cy.get(".MuiCircularProgress-svg").should("exist");

    // check for snackbar after training completes
    cy.wait(["@trainModel"]);
    cy.get("[data-testid=trainingComplete] > .MuiPaper-root").should("exist");

    // test clickaway
    cy.get("[data-testid=user_name]").click();
    cy.get("[data-testid=trainingComplete] > .MuiPaper-root").should("exist");

    // test clicking x
    cy.get(".MuiIconButton-label > .MuiSvgIcon-root").click();
    cy.get("[data-testid=trainingComplete] > .MuiPaper-root").should(
      "not.exist"
    );

    // test timeout
    // bring snackbar back up
    cy.get("[data-testid=trainingButton] > .MuiButton-label").click();

    // wait to receive success response
    cy.wait(["@trainModel"]).then(() => {
      cy.wait(6000)
      cy.get("[data-testid=trainingComplete] > .MuiPaper-root").should(
        "not.exist"
      );
    });
  });
});
