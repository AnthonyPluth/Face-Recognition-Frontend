import React from "react";
import { createMemoryHistory } from "history";
import App from "./App";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import * as ApiContext from "./components/ApiContext";

test("renders without crashing", async () => {
  const mockContext = {};
  const setNewUserNameMock = jest.fn();
  const setIsRecordingMock = jest.fn();

  mockContext.setNewUserName = setNewUserNameMock;
  mockContext.setIsRecording = setIsRecordingMock;

  jest.spyOn(ApiContext, "useApiContext").mockImplementation(() => mockContext);

  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  await screen.findByText("Start Recording");
});
