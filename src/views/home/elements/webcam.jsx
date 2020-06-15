import React, { useEffect, useContext, useRef } from "react";
import Webcam from "react-webcam";
import MaterialCard from "../../../components/shared/card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ApiContext } from "../../../components/contexts/ApiContext";
import { RegistrationContext } from "../../../components/contexts/RegistrationContext";

export const WebcamComponent = () => {
  const apiContext = useContext(ApiContext);
  const registrationContext = useContext(RegistrationContext);

  const { tensorflowGpu } = apiContext;
  const {
    setFrame,
    framerate,
    setFramerate,
    maxScreenshotWidth,
    setMaxScreenshotWidth,
  } = registrationContext;

  const webcamRef = useRef(null);

  const getFrame = React.useCallback(() => {
    setFrame(webcamRef.current.getScreenshot());
  }, [setFrame, webcamRef]);

  useEffect(() => {
    const adjustFramerate = () => {
      setFramerate(tensorflowGpu ? 50 : 500);
    };

    const adjustScreenshotWidth = () => {
      setMaxScreenshotWidth(tensorflowGpu ? 1280 : 640);
    };

    adjustFramerate();
    adjustScreenshotWidth();

    setInterval(() => {
      getFrame();
    }, framerate);
  }, []);

  // const videoConstraints = {
  //   width: maxScreenshotWidth,
  //   // height: 720,
  //   facingMode: "user",
  // };

  return (
    <MaterialCard title="Stats" data-testid="webcam-component">
      <CardContent>
        <Webcam
          id="webcam"
          ref={webcamRef}
          audio={false}
          height={0}
          width={0}
          minScreenshotWidth={maxScreenshotWidth}
          screenshotFormat="image/webp"
          // videoConstraints={videoConstraints}
        />
        <div data-testid="webcam-component">
          <Typography>
            Frame rate: {Number((1000 / framerate).toFixed(2))} fps
          </Typography>
          <Typography>Frame width: {maxScreenshotWidth}px</Typography>
        </div>
      </CardContent>
    </MaterialCard>
  );
};

export default WebcamComponent;
