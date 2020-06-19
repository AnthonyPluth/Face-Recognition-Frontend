import React, { createContext, useState, useContext } from "react";

export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const [apiStatus, setApiStatus] = useState("down");
  const [tensorflowGpu, setTensorflowGpu] = useState(false);
  const [tensorflowVersion, setTensorflowVersion] = useState();
  const [boundingBoxes, setBoundingBoxes] = useState([
    { x: 0, y: 0, w: 0, h: 0 },
  ]);
  const [apiFailed, setApiFailed] = useState(false);
  const [identity, setIdentity] = useState();
  const [confidence, setConfidence] = useState();
  const [apiRetryTime, setApiRetryTime] = useState(Date.now() + 999999);
  const [isRecording, setIsRecording] = useState(false);
  const [maxScreenshotWidth, setMaxScreenshotWidth] = useState(999);
  const [framerate, setFramerate] = useState(999);
  const [frame, setFrame] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const value = {
    apiStatus,
    setApiStatus,
    tensorflowGpu,
    setTensorflowGpu,
    tensorflowVersion,
    setTensorflowVersion,
    boundingBoxes,
    setBoundingBoxes,
    apiFailed,
    setApiFailed,
    identity,
    setIdentity,
    confidence,
    setConfidence,
    apiRetryTime,
    setApiRetryTime,
    isRecording,
    setIsRecording,
    maxScreenshotWidth,
    setMaxScreenshotWidth,
    framerate,
    setFramerate,
    frame,
    setFrame,
    newUserName,
    setNewUserName,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export function useApiContext() {
  return useContext(ApiContext);
}
