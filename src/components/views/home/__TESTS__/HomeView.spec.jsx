import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import HomeView from "../HomeView";
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

it("should decrease camera resolution when tensorflow runs on cpu", async () => {});
it("should increase camera resolution when tensorflow runs on gpu", async () => {});
it("should hide confidence ta camera resolution when tensorflow runs on gpu", async () => {});
it("should throw error when camera access is denied", async () => {});
it("should throw error when registering new user if name isn't provided", async () => {});
it("should display waiting symbol during training", async () => {});
it("should display restart popup after training", async () => {});
it("should hide name, confidence when face not detected", async () => {});
it("should display 'Face not detected' when face not detected", async () => {});
