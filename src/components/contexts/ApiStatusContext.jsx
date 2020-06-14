import React, { createContext, useState, useContext } from "react";

export const ApiStatusContext = createContext();

export const ApiStatusContextProvider = ({ children }) => {
  const [status, setStatus] = useState("down");
  const [tensorflowGpu, setTensorflowGpu] = useState(false);
  const [tensorflowVersion, setTensorflowVersion] = useState();
  const value = {
    status,
    setStatus,
    tensorflowGpu,
    setTensorflowGpu,
    tensorflowVersion,
    setTensorflowVersion,
  };
  return (
    <ApiStatusContext.Provider value={value}>
      {children}
    </ApiStatusContext.Provider>
  );
};

export function useApiStatusState() {
  return useContext(ApiStatusContext);
}
