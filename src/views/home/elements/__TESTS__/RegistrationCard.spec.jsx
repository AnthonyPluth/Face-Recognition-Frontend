import React from "react";
import { render, screen } from "@testing-library/react";
import WebcamComponent from "../Webcam";
import { ApiContext } from "../../../../components/contexts/ApiContext";
import { WebcamContextProvider } from "../../../../components/contexts/WebcamContext";
import {
  mockApiContextRecording,
  mockApiContextNotRecording,
} from "../../../../components/contexts/mockContexts/mockApiContext";

describe("Registration Card", () => {
  it("should display waiting symbol during training", async () => {});
  it("should display restart popup after training", async () => {});
  it("should start recording if newUserName has been provided", async () => {});
  it("should throw validation error newUserName has not been provided", async () => {});
});
