import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import HomeView from "../Home";
import { getIdentityFromSnapshot } from "../../../helpers/faceRecApi";

jest.mock("../../../helpers/faceRecApi");

describe("HomeView", () => {
  const mockApi = getIdentityFromSnapshot;
  beforeEach(() => {
    mockApi.mockReturnValue({
      name: "Test User",
      confidence: "99.99%",
    });
  });

  it("should show offline alert if no response is received from api", async () => {
    mockApi.mockReturnValue({});

    const { getByTestId } = render(
      <Router history={createMemoryHistory()}>
        <HomeView />
      </Router>
    );
    await screen.findByTestId("homeView");
    expect(getByTestId("offlineAlert"));
  });

  it("should show ui if api is online", async () => {
    const { getByTestId } = render(
      <Router history={createMemoryHistory()}>
        <HomeView />
      </Router>
    );
    await screen.findByTestId("faceRecognitionCard");
    expect(getByTestId("user_name").innerHTML).toEqual("Name: Test User");
  });
});

it("should check health api on startup", async () => {});
it("should throw warning if camera access is denied", async () => {});
it("shxould display 'Face not detected' when face not detected", async () => {});
it("should hide name, confidence when face not detected", async () => {});
