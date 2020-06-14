import React from "react";
import { render, screen } from "@testing-library/react";
import WebcamComponent from "../webcam";
import { ApiStatusContext } from "../../../../components/contexts/ApiStatusContext";
import { WebcamContextProvider } from "../../../../components/contexts/WebcamContext";
import {
  mockApiStatusContextCpu,
  mockApiStatusContextGpu,
} from "../../../../components/contexts/mockContexts/mockApiStatusContext";

describe("webcam", () => {
  it("should decrease framerate & frame size when tensorflow runs on cpu", async () => {
    const { getByText } = render(
      <ApiStatusContext.Provider value={mockApiStatusContextCpu()}>
        <WebcamContextProvider>
          <WebcamComponent />
        </WebcamContextProvider>
      </ApiStatusContext.Provider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 5 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 640px");
  });

  it("should increase framerate & frame size when tensorflow runs on gpu", async () => {
    const { getByText } = render(
      <ApiStatusContext.Provider value={mockApiStatusContextGpu()}>
        <WebcamContextProvider>
          <WebcamComponent />
        </WebcamContextProvider>
      </ApiStatusContext.Provider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 20 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 1280px");
  });
});
