import React from "react";
import { render, screen } from "@testing-library/react";
import WebcamComponent from "../webcam";
import { ApiContext } from "../../../../components/contexts/ApiContext";
import { RegistrationContextProvider } from "../../../../components/contexts/RegistrationContext";
import {
  mockApiContextCpu,
  mockApiContextGpu,
} from "../../../../components/contexts/mockContexts/mockApiContext";

describe("webcam", () => {
  it("should decrease framerate & frame size when tensorflow runs on cpu", async () => {
    const { getByText } = render(
      <ApiContext.Provider value={mockApiContextCpu()}>
        <RegistrationContextProvider>
          <WebcamComponent />
        </RegistrationContextProvider>
      </ApiContext.Provider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 5 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 640px");
  });

  it("should increase framerate & frame size when tensorflow runs on gpu", async () => {
    const { getByText } = render(
      <ApiContext.Provider value={mockApiContextGpu()}>
        <RegistrationContextProvider>
          <WebcamComponent />
        </RegistrationContextProvider>
      </ApiContext.Provider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 20 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 1280px");
  });
});
