import React from "react";
import MaterialCard from "../../../components/card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useApiContext } from "../../../components/ApiContext";

export const WebcamComponent = () => {
  const { framerate, maxScreenshotWidth } = useApiContext();

  return (
    <MaterialCard title="Stats" data-testid="webcam-component">
      <CardContent>
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
