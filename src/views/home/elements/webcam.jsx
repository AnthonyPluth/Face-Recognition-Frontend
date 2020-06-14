import React, { useEffect, useContext, useRef } from "react";
import Webcam from "react-webcam";
import Typography from "@material-ui/core/Typography";
import { ApiStatusContext } from "../../../components/contexts/ApiStatusContext";
import { WebcamContext } from "../../../components/contexts/WebcamContext";

export const WebcamComponent = () => {
  const apiStatusContext = useContext(ApiStatusContext);
  const webcamContext = useContext(WebcamContext);
  const { status, tensorflowGpu, tensorflowVersion } = apiStatusContext;
  const {
    setSnapshot,
    framerate,
    setFramerate,
    maxScreenshotWidth,
    setMaxScreenshotWidth,
  } = webcamContext;
  const webcamRef = useRef(null);

  useEffect(() => {
    adjustFramerate();
    adjustScreenshotWidth();

    setInterval(() => {
      getSnapshot();
    }, framerate);
  });

  const adjustFramerate = () => {
    setFramerate(tensorflowGpu ? 50 : 200);
  };

  const adjustScreenshotWidth = () => {
    setMaxScreenshotWidth(tensorflowGpu ? 1280 : 640);
  };

  const getSnapshot = React.useCallback(() => {
    setSnapshot(webcamRef.current.getScreenshot());
  }, [setSnapshot, webcamRef]);

  const videoConstraints = {
    width: maxScreenshotWidth,
    // height: 720,
    facingMode: "user",
  };

  return (
    <div data-testid="webcam-component">
      <Webcam
        id="webcam"
        ref={webcamRef}
        audio={false}
        height={0}
        width={0}
        // minScreenshotWidth={maxScreenshotWidth}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <Typography>
        Frame rate: {Number((1000 / framerate).toFixed(2))} fps
      </Typography>
      <Typography>Frame width: {maxScreenshotWidth}px</Typography>
    </div>
  );
};

export default WebcamComponent;
