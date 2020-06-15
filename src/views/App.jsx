import React from "react";
import HomeView from "./home/Home";
import { ApiContextProvider } from "../components/contexts/ApiContext";

export const App = () => {
  return (
    <ApiContextProvider>
      <HomeView />
    </ApiContextProvider>
  );
};
export default App;
