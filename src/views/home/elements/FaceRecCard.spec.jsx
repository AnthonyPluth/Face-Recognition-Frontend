import React from "react";
import { render, screen } from "@testing-library/react";
import FaceRecCard from "./FaceRecCard";
import { getIdentityFromSnapshot } from "../../../helpers/faceRecApi";
import { ApiContext } from "../../../components/contexts/ApiContext";

jest.mock("../../../helpers/faceRecApi");

describe("FaceRecCard", () => {
  const mockApi = getIdentityFromSnapshot;

  beforeEach(() => {
    mockApi.mockReturnValue({
      identity: "Joe",
      confidence: 12.3899,
    });
  });

  it("should display name & confidence when face detected", async () => {
    const mockContext = { identity: "Joe", confidence: 12.38892398499 };

    const { getByText } = render(
      <ApiContext.Provider value={mockContext}>
        <FaceRecCard />
      </ApiContext.Provider>
    );
    await screen.findByTestId("user_name");

    expect(getByText(/^Name:/).textContent).toBe("Name: Joe");
    expect(getByText(/^Confidence:/).textContent).toBe("Confidence: 12.39%");
  });

  it("should hide name, confidence when face not detected", async () => {
    const mockContext = {};

    const { getByText } = render(
      <ApiContext.Provider value={mockContext}>
        <FaceRecCard />
      </ApiContext.Provider>
    );
    await screen.findByTestId("user_name");
    // console.log(getByTestId("apiStatus").textContent);

    expect(getByText(/^Name:/).textContent).toBe("Name: ");
    expect(getByText(/^Confidence:/).textContent).toBe("Confidence: ");
  });
});
