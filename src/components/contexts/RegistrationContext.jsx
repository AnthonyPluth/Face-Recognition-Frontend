import React, { createContext, useState, useContext } from "react";

export const RegistrationContext = createContext();

export const RegistrationContextProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [maxScreenshotWidth, setMaxScreenshotWidth] = useState(999);
  const [framerate, setFramerate] = useState(999);
  const [frame, setFrame] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const value = {
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
  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export function useWebcamState() {
  return useContext(RegistrationContext);
}
