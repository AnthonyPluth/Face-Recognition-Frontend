import React from "react";
import { render, screen } from "@testing-library/react";
import WebcamComponent from "./WebcamComponent";
import ApiStatus from "./ApiStatus";
import { ApiContextProvider } from "../../../components/contexts/ApiContext";
import { getApiStatus } from "../../../helpers/faceRecApi";

jest.mock("../../../helpers/faceRecApi");

describe("webcam", () => {
  it("should decrease framerate & frame size when tensorflow runs on cpu", async () => {
    const mockApi = getApiStatus;
    mockApi.mockReturnValue({
      status: "up",
      tensorflowGpu: false,
    });

    const { getByText } = render(
      <ApiContextProvider>
        <ApiStatus />
        <WebcamComponent />
      </ApiContextProvider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 5 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 250px");
  });

  it("should increase framerate & frame size when tensorflow runs on gpu", async () => {
    const mockApi = getApiStatus;
    mockApi.mockReturnValue({
      status: "up",
      tensorflowGpu: true,
    });

    const { getByText } = render(
      <ApiContextProvider>
        <ApiStatus />
        <WebcamComponent />
      </ApiContextProvider>
    );
    await screen.findByTestId("webcam-component");

    expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 20 fps");
    expect(getByText(/^Frame\ width:/).textContent).toBe("Frame width: 1280px");
  });

  // it("should throw warning if camera access is denied", async () => {
  //   const { getByText } = render(
  //     <ApiContext.Provider value={mockApiContextGpu()}>
  //       <RegistrationContextProvider>
  //         <WebcamComponent />
  //       </RegistrationContextProvider>
  //     </ApiContext.Provider>
  //   );
  //   await screen.findByTestId("webcam-component");
  //   expect(getByText(/^Frame\ rate:/).textContent).toBe("Frame rate: 20 fps");
  // });
});
