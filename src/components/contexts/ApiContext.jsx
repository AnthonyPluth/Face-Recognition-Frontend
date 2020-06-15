import React, { createContext, useState, useContext } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const [apiStatus, setApiStatus] = useState("down");
  const [tensorflowGpu, setTensorflowGpu] = useState(false);
  const [tensorflowVersion, setTensorflowVersion] = useState();
  const [processedFrame, setProcessedFrame] = useState();
  const [apiFailed, setApiFailed] = useState(false);
  const [identity, setIdentity] = useState();
  const [confidence, setConfidence] = useState();
  const [apiRetryTime, setApiRetryTime] = useState(Date.now() + 999999);
  const value = {
    apiStatus,
    setApiStatus,
    tensorflowGpu,
    setTensorflowGpu,
    tensorflowVersion,
    setTensorflowVersion,
    processedFrame,
    setProcessedFrame,
    apiFailed,
    setApiFailed,
    identity,
    setIdentity,
    confidence,
    setConfidence,
    apiRetryTime,
    setApiRetryTime,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export function useApiStatusState() {
  return useContext(ApiContext);
}
