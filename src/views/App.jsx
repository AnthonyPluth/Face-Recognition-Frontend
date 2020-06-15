import React from "react";
import HomeView from "./home/Home";
import { ApiContextProvider } from "../components/contexts/ApiContext";

export const App = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <ApiContextProvider>
        <HomeView />
      </ApiContextProvider>
    </div>
  );
};
export default App;
