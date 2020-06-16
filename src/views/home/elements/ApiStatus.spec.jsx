import React from "react";
import { render, screen } from "@testing-library/react";
import ApiStatus from "./ApiStatus";
import { getApiStatus } from "../../../helpers/faceRecApi";
import {
  ApiContextProvider,
  ApiContext,
} from "../../../components/contexts/ApiContext";
import { RegistrationContextProvider } from "../../../components/contexts/RegistrationContext";

jest.mock("../../../helpers/faceRecApi");

describe("ApiStatus", () => {
  const mockApi = getApiStatus;
  beforeEach(() => {
    mockApi.mockReturnValue({
      status: "up",
      tensorflowGpu: false,
    });
  });

  // it("should show offline alert if no response is received from api", async () => {
  //   mockApi.mockReturnValue({});

  //   const mockContext = {
  //     apiFailed: true,
  //     apiFailureCount: 3,
  //   };

  //   const { getByTestId } = render(
  //     <ApiContext.Provider values={jest.fn()}>
  //       <RegistrationContextProvider>
  //         <ApiStatus />
  //       </RegistrationContextProvider>
  //     </ApiContext.Provider>
  //   );
  //   await screen.findByTestId("offlineAlert");
  //   // console.log(getByTestId("apiStatus").textContent);

  //   expect(screen.getByText("offline").toBeInTheDocument());
  // });

  // it("should not show offline alert if api is online", async () => {
  //   const { getByTestId } = render(
  //     <ApiContextProvider>
  //       <RegistrationContextProvider>
  //         <ApiStatus />
  //       </RegistrationContextProvider>
  //     </ApiContextProvider>
  //   );
  //   await screen.findByTestId("apiStatus");
  //   getByTestId("apiStatus");
  //   console.log(getByTestId("apiStatus").textContent);
  //   expect(getByTestId("apiStatus").textContent.toBe(""));
  // });

  it("should check health api on startup", async () => {});
});
