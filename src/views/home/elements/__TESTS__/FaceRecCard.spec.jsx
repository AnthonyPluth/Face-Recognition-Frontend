import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import HomeView from "../Home";
import { getIdentityFromSnapshot } from "../../../helpers/faceRecApi";

jest.mock("../../../helpers/faceRecApi");

describe("HomeView", () => {
  const mockApi = getIdentityFromSnapshot;
  beforeEach(() => {
    mockApi.mockReturnValue({
      name: "Test User",
      confidence: "99.99%",
    });
  });
});
