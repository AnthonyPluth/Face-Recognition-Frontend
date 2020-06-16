import React from "react";
import { createMemoryHistory } from "history";
import App from "./App";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";

test("renders without crashing", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
});
