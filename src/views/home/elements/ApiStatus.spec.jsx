import React from "react";
import { render, screen } from "@testing-library/react";
import * as ApiContext from "../../../components/ApiContext";
import ApiStatus from "./ApiStatus";
import {
  getApiStatus,
  getIdentityFromSnapshot,
} from "../../../helpers/faceRecApi";

jest.mock("../../../helpers/faceRecApi");

describe("ApiStatus", () => {
  const mockStatusApi = getApiStatus;
  const mockIdentityApi = getIdentityFromSnapshot;
  let mockContext = {};
  const setApiFailedMock = jest.fn();
  const setApiStatusMock = jest.fn();
  const setTensorflowGpuMock = jest.fn();
  const setProcessedFrameMock = jest.fn();
  const setApiRetryTimeMock = jest.fn();
  const setIdentityMock = jest.fn();
  const setConfidenceMock = jest.fn();
  const setBoundingBoxesMock = jest.fn();

  beforeEach(() => {
    mockContext.setApiFailed = setApiFailedMock;
    mockContext.setApiStatus = setApiStatusMock;
    mockContext.setApiStatus = setApiStatusMock;
    mockContext.setTensorflowGpu = setTensorflowGpuMock;
    mockContext.setProcessedFrame = setProcessedFrameMock;
    mockContext.setApiRetryTime = setApiRetryTimeMock;
    mockContext.setIdentity = setIdentityMock;
    mockContext.setConfidence = setConfidenceMock;
    mockContext.setBoundingBoxes = setBoundingBoxesMock;
    mockStatusApi.mockReturnValue({});
    mockIdentityApi.mockReturnValue({});
  });

  it("should show offline alert if api is offline", async () => {
    mockContext.apiFailed = true;
    mockContext.apiRetryTime = Date.now() + 10000;

    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<ApiStatus />);

    await screen.findByTestId("offlineAlert");
    await screen.getByText(/^Python\ backend/);
    expect(screen.getByTestId("offlineAlert").textContent).toContain(
      "API Down"
    );
  });

  it("should show offline alert if api is offline", async () => {
    mockContext.apiFailed = false;

    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<ApiStatus />);

    await screen.queryByTestId("offlineAlert");
    expect(screen.queryByTestId("offlineAlert")).toBeNull();
  });

  it("should set context based on api response", async () => {
    mockStatusApi.mockReturnValue({
      status: "up",
      tensorflowVersion: "1.15.0",
      tensorflowGpu: true,
    });

    mockIdentityApi.mockReturnValue({
      name: "test",
      confidence: 0.9876543,
      bounding_boxes: [{ x: 12, y: 34, w: 56, h: 78 }],
    });

    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<ApiStatus />);
    await screen.queryByTestId("offlineAlert");

    expect(setTensorflowGpuMock).toBeCalledWith(true);
    expect(setApiStatusMock).toBeCalledWith("up");
    expect(setApiFailedMock).toBeCalledWith(false);
    expect(setIdentityMock).toBeCalledWith("test");
    expect(setConfidenceMock).toBeCalledWith(0.9876543);
    expect(setBoundingBoxesMock).toBeCalledWith([
      { x: 12, y: 34, w: 56, h: 78 },
    ]);
  });

  it("should check health api on startup", async () => {});
});
