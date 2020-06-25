import React from "react";
import { render, screen } from "@testing-library/react";
import FaceRecCard from "./FaceRecCard";
import * as ApiContext from "../../../components/ApiContext";

describe("FaceRecCard", () => {
  let mockContext = {};
  const setFrameMock = jest.fn();
  const setMaxScreenshotWidthMock = jest.fn();
  const setFramerateMock = jest.fn();

  beforeEach(() => {
    mockContext.setFrame = setFrameMock;
    mockContext.setFramerate = setFramerateMock;
    mockContext.setMaxScreenshotWidth = setMaxScreenshotWidthMock;
  });

  it("should hide name, confidence when face not detected", async () => {
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    const { getByText } = render(<FaceRecCard />);
    await screen.findByTestId("user_name");

    expect(getByText(/^Name:/).textContent).toBe("Name: ");
    expect(getByText(/^Confidence:/).textContent).toBe("Confidence: ");
  });

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

  it("should increase framerate & resolution when using gpu", async () => {
    mockContext.tensorflowGpu = true;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<FaceRecCard />);
    await screen.findByTestId("user_name");

    expect(setFramerateMock).toBeCalledWith(50);
    expect(setMaxScreenshotWidthMock).toBeCalledWith(640);
  });
});
