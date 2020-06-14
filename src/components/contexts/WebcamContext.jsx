import React, { createContext, useState, useContext } from "react";

export const WebcamContext = createContext();

export const WebcamContextProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [maxScreenshotWidth, setMaxScreenshotWidth] = useState(999);
  const [framerate, setFramerate] = useState(999);
  const [snapshot, setSnapshot] = useState();
  const value = {
    isRecording,
    setIsRecording,
    maxScreenshotWidth,
    setMaxScreenshotWidth,
    framerate,
    setFramerate,
    snapshot,
    setSnapshot,
  };
  return (
    <WebcamContext.Provider value={value}>{children}</WebcamContext.Provider>
  );
};

export function useWebcamState() {
  return useContext(WebcamContext);
}
