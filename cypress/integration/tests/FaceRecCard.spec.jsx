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

// describe("FaceRecCard", () => {
//   let mockContext = {};

//   it("should display name & confidence when face detected", async () => {
//     mockContext.identity = "Joe";
//     mockContext.confidence = 12.38892398499;
//     jest
//       .spyOn(ApiContext, "useApiContext")
//       .mockImplementation(() => mockContext);

//     const { getByText } = render(<FaceRecCard />);
//     await screen.findByTestId("user_name");

//     expect(getByText(/^Name:/).textContent).toBe("Name: Joe");
//     expect(getByText(/^Confidence:/).textContent).toBe("Confidence: 12.39%");
//   });

//   it("should hide name, confidence when face not detected", async () => {
//     mockContext = {};
//     jest
//       .spyOn(ApiContext, "useApiContext")
//       .mockImplementation(() => mockContext);

//     const { getByText } = render(<FaceRecCard />);
//     await screen.findByTestId("user_name");

//     expect(getByText(/^Name:/).textContent).toBe("Name: ");
//     expect(getByText(/^Confidence:/).textContent).toBe("Confidence: ");
//   });
// });
// describe("FaceRecCard", () => {
//   let mockContext = {};

//   it("should display name & confidence when face detected", async () => {
//     mockContext.identity = "Joe";
//     mockContext.confidence = 12.38892398499;
//     jest
//       .spyOn(ApiContext, "useApiContext")
//       .mockImplementation(() => mockContext);

//     const { getByText } = render(<FaceRecCard />);
//     await screen.findByTestId("user_name");

//     expect(getByText(/^Name:/).textContent).toBe("Name: Joe");
//     expect(getByText(/^Confidence:/).textContent).toBe("Confidence: 12.39%");
//   });

//   it("should hide name, confidence when face not detected", async () => {
//     mockContext = {};
//     jest
//       .spyOn(ApiContext, "useApiContext")
//       .mockImplementation(() => mockContext);

//     const { getByText } = render(<FaceRecCard />);
//     await screen.findByTestId("user_name");

//     expect(getByText(/^Name:/).textContent).toBe("Name: ");
//     expect(getByText(/^Confidence:/).textContent).toBe("Confidence: ");
//   });
// });
