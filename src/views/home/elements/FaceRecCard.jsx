import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MaterialCard from "../../../components/card";
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

  const adjustFramerate = (usingGPU) => {
    setFramerate(usingGPU ? 50 : 200);
  };

  const adjustScreenshotWidth = (usingGPU) => {
    setMaxScreenshotWidth(usingGPU ? 640 : 250);
  };

  useEffect(() => {
    // update framerate & frame size when tensorFlow GPU state changes
    adjustFramerate(tensorflowGpu);
    adjustScreenshotWidth(tensorflowGpu);

    const interval = setInterval(() => {
      getFrame();
    }, framerate);
    return () => clearInterval(interval);
  }, [tensorflowGpu]);

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
          <svg
            viewBox={`-8 0 ${maxScreenshotWidth} ${maxScreenshotWidth * 0.75}`}
            style={{
              position: "absolute",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <rect
              id="boundingbox"
              x={boundingBoxes[0].x}
              y={boundingBoxes[0].y}
              width={boundingBoxes[0].w}
              height={boundingBoxes[0].h}
              strokeWidth={3}
              stroke="#eb4034"
              fillOpacity="0"
            />
          </svg>
        </div>
      </CardContent>
    </MaterialCard>
  );
}
