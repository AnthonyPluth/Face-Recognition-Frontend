import React from "react";
import { render, screen } from "@testing-library/react";
import WebcamComponent from "./WebcamComponent";
import * as ApiContext from "../../../components/ApiContext";

describe("webcam", () => {
  let mockContext = {};

  it("should show framerate & frame size using context", async () => {
    mockContext.framerate = 200;
    mockContext.maxScreenshotWidth = 250;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    const { getByText } = render(<WebcamComponent />);
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 5 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 250px");
  });
});
