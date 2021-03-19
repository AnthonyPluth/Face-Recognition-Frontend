import React, { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MaterialCard from "../../../components/card";
import BoundingBoxes from "../../../components/BoundingBoxes";
import { useApiContext } from "../../../components/ApiContext";

export default function RegistrationCard() {
  const {
    identity,
    confidence,
    setFrame,
    framerate,
    setFramerate,
    maxScreenshotWidth,
    setMaxScreenshotWidth,
    tensorflowGpu,
    boundingBoxes,
  } = useApiContext();

  const webcamRef = useRef(null);

  const getFrame = React.useCallback(() => {
    setFrame(webcamRef.current.getScreenshot());
  }, [setFrame, webcamRef]);

  const adjustFramerate = useCallback((usingGPU) => {
    setFramerate(usingGPU ? 50 : 200);
  }, [setFramerate]);

  const adjustScreenshotWidth = useCallback((usingGPU) => {
    setMaxScreenshotWidth(usingGPU ? 640 : 250);
  }, [setMaxScreenshotWidth]);

  useEffect(() => {
    // update framerate & frame size when tensorFlow GPU state changes
    adjustFramerate(tensorflowGpu);
    adjustScreenshotWidth(tensorflowGpu);

    const interval = setInterval(() => {
      getFrame();
    }, framerate);
    return () => clearInterval(interval);
  }, [adjustFramerate, adjustScreenshotWidth, framerate, getFrame, tensorflowGpu]);

  return (
    <MaterialCard title="Face Recognition">
      <CardContent>
        <Typography data-testid="user_name">Name: {identity}</Typography>
        <Typography>
          Confidence:{" "}
          {confidence &&
            (confidence / 100).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
            })}
        </Typography>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Webcam
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            id="webcam"
            ref={webcamRef}
            audio={false}
            width={"100%"}
            minScreenshotWidth={maxScreenshotWidth}
            screenshotFormat="image/webp"
          />

          <BoundingBoxes
            boundingBoxes={boundingBoxes}
            maxScreenshotWidth={maxScreenshotWidth}
          />
        </div>
      </CardContent>
    </MaterialCard>
  );
}
