import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import HomeView from "./Home";
import { getIdentityFromSnapshot } from "../../helpers/faceRecApi";
import { ApiContext } from "../../components/contexts/ApiContext";

jest.mock("../../helpers/faceRecApi");

describe("HomeView", () => {
  const mockApi = getIdentityFromSnapshot;
  beforeEach(() => {
    mockApi.mockReturnValue({
      name: "Test User",
      confidence: "99.99%",
    });
  });

  it("renders", () => {
    // const history = createMemoryHistory();
    // render(
    //   <Router history={history}>
    //     <ApiContext.Provider>
    //       <HomeView />
    //     </ApiContext.Provider>
    //   </Router>
    // );
  });
});
