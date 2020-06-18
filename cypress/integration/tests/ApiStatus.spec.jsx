/// <reference types="cypress" />

context("API Staqtus", () => {
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
      method: "POST",
      url: "/identify",
      response: {
        name: "ApiStatus",
        confidence: 25.0,
        framed_image:
          "UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoBAAEAAgA0JaACdLoAA5gA/vmTb/+QH/+QH/+QH/8gP+IXexhQAA==",
      },
    }).as("identify");
  });

  // it("should show offline alert if api is offline", async () => {
  //   mockContext.apiFailed = true;
  //   jest
  //     .spyOn(ApiContext, "useApiContext")
  //     .mockImplementation(() => mockContext);

  //   render(<ApiStatus />);

  //   await screen.findByTestId("offlineAlert");
  //   // await screen.findByText(/^Python\ backend/);
  //   expect(screen.getByText("API Down").textContent).toBe("API Down");

  //   expect(setApiFailedMock).toHaveBeenCalledWith(true);
  //   expect(setApiRetryTimeMock).toHaveBeenCalledTimes(1);
  // });

  // it("should not show offline alert if api is online", async () => {
  // });
});
