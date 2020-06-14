import React from "react";
import { MemoryRouter } from "react-router";

export const MockMemoryRouter = ({ children }) => {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
};

export const noop = () => undefined;
