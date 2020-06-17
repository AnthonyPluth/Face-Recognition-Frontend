import React from "react";
import RegistrationCard from "./RegistrationCard";
import * as ApiContext from "../../../components/contexts/ApiContext";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

jest.mock("../../../helpers/faceRecApi");

describe("Registration Card", () => {
  let mockContext = {};
  const setIsRecordingMock = jest.fn();
  const setNewUserNameMock = jest.fn();

  beforeEach(() => {
    mockContext.setNewUserName = setNewUserNameMock;
    mockContext.setIsRecording = setIsRecordingMock;
    mockContext.isRecording = false;
  });

  it("should throw validation error if newUserName is undefined", async () => {
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<RegistrationCard />);

    // Click 'Start Recording'
    const recordButton = await screen.findByText("Start Recording");
    fireEvent.click(recordButton);
    await screen.findByText("Start Recording");

    // Expect validation message
    await screen.getByText(/^Name\ is\ required/);
    expect(screen.getByText(/^Name\ is\ required/).textContent).toBe(
      "Name is required"
    );

    // Expect form to not be submitted
    expect(setIsRecordingMock).toBeCalledTimes(0);
  });

  it("should bypass validation if already recording", async () => {
    mockContext.isRecording = true;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<RegistrationCard />);

    // Click 'Stop Recording'
    const recordButton = await screen.findByText("Stop Recording");
    fireEvent.click(recordButton);
    await screen.findByText("Stop Recording");

    expect(setIsRecordingMock).toHaveBeenCalledTimes(1);
    expect(setIsRecordingMock).toHaveBeenCalledWith(false);
  });

  it("should throw validation error if newUserName is undefined", async () => {
    mockContext.isRecording = false;
    jest
      .spyOn(ApiContext, "useApiContext")
      .mockImplementation(() => mockContext);

    render(<RegistrationCard />);

    // Simulate text entry
    const nameInput = screen.getByTestId("newUserName");
    fireEvent.change(nameInput, { target: { value: "abc" } });

    // Click 'Start Recording'
    const recordButton = await screen.findByText("Start Recording");
    fireEvent.click(recordButton);
    await screen.findByText("Start Recording");

    // Expect form to be submitted & context to be set
    expect(setIsRecordingMock).toHaveBeenCalledWith(true);
    expect(setNewUserNameMock).toHaveBeenCalledWith("abc");
  });

  it("should display success snackbar after training", async () => {
    render(<RegistrationCard />);

    // click training button
    const trainingButton = await screen.findByText("Train Model");
    fireEvent.click(trainingButton);
    await screen.findByText("Train Model");
    await screen.findByTestId("trainingButton");
    await screen.findByTestId("trainingComplete");

    // ensure snackbar is shown on completion
    await screen.queryByTestId("trainingInProgress");
    expect(screen.queryByTestId("trainingInProgress")).toBeNull();
    expect(screen.getByTestId("trainingButton")).toBeTruthy();
    expect(screen.getByTestId("trainingComplete")).toBeTruthy();

    // test clickaway from alert - should remain open
    const recordButton = await screen.findByText("Start Recording");
    fireEvent.click(recordButton);
    expect(screen.queryByTestId("trainingComplete")).toBeTruthy();

    await waitForElementToBeRemoved(
      () => screen.getByTestId("trainingComplete"),
      {
        timeout: 11000,
      }
    );
    expect(screen.queryByTestId("trainingComplete")).toBeNull();
  });
});
