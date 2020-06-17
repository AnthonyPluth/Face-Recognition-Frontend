import React from "react";
import { render, screen } from "@testing-library/react";
import FaceRecCard from "./FaceRecCard";
import * as ApiContext from "../../../components/contexts/ApiContext";

describe("FaceRecCard", () => {
  let mockContext = {};

  it("should display name & confidence when face detected", async () => {
    mockContext.identity = "Joe";
    mockContext.confidence = 12.38892398499;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    const { getByText } = render(<FaceRecCard />);
    await screen.findByTestId("user_name");

    expect(getByText(/^Name:/).textContent).toBe("Name: Joe");
    expect(getByText(/^Confidence:/).textContent).toBe("Confidence: 12.39%");
  });

  it("should hide name, confidence when face not detected", async () => {
    mockContext = {};
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    const { getByText } = render(<FaceRecCard />);
    await screen.findByTestId("user_name");

    expect(getByText(/^Name:/).textContent).toBe("Name: ");
    expect(getByText(/^Confidence:/).textContent).toBe("Confidence: ");
  });
});
