import React from "react";
import { render, screen } from "@testing-library/react";
import * as ApiContext from "../../../components/ApiContext";
import ApiStatus from "./ApiStatus";
import { getApiStatus } from "../../../helpers/faceRecApi";

jest.mock("../../../helpers/faceRecApi");

describe("ApiStatus", () => {
  let mockContext = {};
  const setApiFailedMock = jest.fn();
  const setApiStatusMock = jest.fn();
  const setTensorflowGpuMock = jest.fn();
  const setProcessedFrameMock = jest.fn();
  const setApiRetryTimeMock = jest.fn();

  beforeEach(() => {
    mockContext.setApiFailed = setApiFailedMock;
    mockContext.setApiStatus = setApiStatusMock;
    mockContext.setTensorflowGpu = setTensorflowGpuMock;
    mockContext.setProcessedFrame = setProcessedFrameMock;
    mockContext.setApiRetryTime = setApiRetryTimeMock;
  });

  const mockApi = getApiStatus;
  beforeEach(() => {
    mockApi.mockReturnValue({});
  });

  it("should show offline alert if api is offline", async () => {
    mockContext.apiFailed = true;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<ApiStatus />);

    await screen.findByTestId("offlineAlert");
    // await screen.findByText(/^Python\ backend/);
    expect(screen.getByText("API Down").textContent).toBe("API Down");

    expect(setApiFailedMock).toHaveBeenCalledWith(true);
    expect(setApiRetryTimeMock).toHaveBeenCalledTimes(1);
  });

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
});
