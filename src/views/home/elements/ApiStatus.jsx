import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useApiContext } from "../../../components/ApiContext";
import {
  getApiStatus,
  getIdentityFromSnapshot,
  recordSnapshot,
} from "../../../helpers/faceRecApi";
import Countdown from "react-countdown";
import ReconnectingWebSocket from "reconnecting-websocket";

const rws = new ReconnectingWebSocket("ws://192.168.60.194:8080/");

export default function ApiStatus() {
  const [apiFailureCount, setApiFailureCount] = useState(0);
  const {
    apiFailed,
    apiRetryTime,
    frame,
    isRecording,
    newUserName,
    setApiFailed,
    setApiRetryTime,
    setApiStatus,
    setConfidence,
    setIdentity,
    setBoundingBoxes,
    // setTensorflowGpu,
  } = useApiContext();

  rws.addEventListener("message", (wsMessage) => {
    if (wsMessage !== null) {
      setApiFailureCount(0);
    } else {
      setApiFailureCount(apiFailureCount + 1);
    }

    handleApiResponse(wsMessage);
  });

  const renderer = ({ seconds }) => {
    if (apiFailed) {
      return (
        <Alert variant="filled" severity="error" data-testid="offlineAlert">
          <AlertTitle>API Down</AlertTitle>
          Python backend is offline; trying again in {seconds} seconds...
        </Alert>
      );
    } else return <></>;
  };

  const updateApiStatus = async () => {
    const apiResponse = await getApiStatus();
    if (apiResponse !== null) {
      // setTensorflowGpu(apiResponse.tensorflowGpu);
      setApiStatus(apiResponse.status);
      setApiFailed(false);
      setApiFailureCount(0);
    } else {
      setApiFailed(true);
      setApiFailureCount(apiFailureCount + 1);
      setApiRetryTime(Date.now() + 10000);
    }
  };

  const handleRecordedFrame = async (rawFrame) => {
    await recordSnapshot(rws, newUserName, rawFrame);
  };

  const handleIdentifyFrame = async (rawFrame) => {
    await getIdentityFromSnapshot(rws, rawFrame);
  };

  const handleApiResponse = (apiResponse) => {
    if (apiResponse !== (null || undefined)) {
      setIdentity(apiResponse.name);
      setConfidence(apiResponse.confidence);
      setBoundingBoxes(apiResponse.bounding_boxes);
    }
  };

  useEffect(() => {
    // check api status on page load
    console.log("getting api status");
    updateApiStatus();
  }, []);

  useEffect(() => {
    // update status every 10 seconds when failing
    if (apiFailed || apiFailureCount >= 5) {
      if (!apiFailed) setApiFailed(true);

      setApiRetryTime(Date.now() + 10000);
      const interval = setInterval(() => {
        updateApiStatus();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [apiFailureCount]);

  useEffect(() => {
    // send frame to appropriate endpoint
    if (!apiFailed) {
      isRecording ? handleRecordedFrame(frame) : handleIdentifyFrame(frame);
    }
  }, [frame]);

  return <Countdown date={apiRetryTime} renderer={renderer} />;
}
