import React from "react";
import ReactDOM from "react-dom";
import { render, waitForElement } from "@testing-library/react";
import { HomeView } from "../HomeView";
import { MockMemoryRouter } from "../../../../utils/testUtils";
import { getIdentityFromSnapshot } from "../../../../api/faceRecApi";

jest.mock("../../../../api/faceRecApi");

describe("HomeView", () => {
  const mockApi = getIdentityFromSnapshot;
  beforeEach(() => {
    mockApi.mockReturnValue({
      name: "Test User",
      confidence: "99.99%",
    });
  });

  // it("should render homeView", async () => {
  //   const { getByTestId } = ReactDOM.render(
  //     <MockMemoryRouter>
  //       <HomeView />
  //     </MockMemoryRouter>
  //   );
  //   await waitForElement(() => getByTestId("homeView"));
  // });

  it("should fail if backend isn't running", async () => {
    mockApi.mockReturnValue({});
    const { getByTestId } = render(<HomeView />);
    await waitForElement(() => getByTestId("homeView"));
    expect(getByTestId("user_name").textContent).toBe(
      `Name: Face not detected`
    );
  });
});
