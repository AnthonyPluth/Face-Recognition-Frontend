import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useApiContext } from "../../../components/contexts/ApiContext";
import {
  getApiStatus,
  getIdentityFromSnapshot,
  recordSnapshot,
} from "../../../helpers/faceRecApi";
import Countdown from "react-countdown";

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
    setProcessedFrame,
    setTensorflowGpu,
  } = useApiContext();

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
    try {
      const apiResponse = await getApiStatus();
      setTensorflowGpu(apiResponse.tensorflowGpu);
      setApiStatus(apiResponse.status);
      setApiFailed(false);
      setApiFailureCount(0);
    } catch {
      setApiFailed(true);
      setApiFailureCount(apiFailureCount + 1);
      setApiRetryTime(Date.now() + 10000);
    }
  };

  const handleRecordedFrame = async (rawFrame) => {
    try {
      const apiResponse = await recordSnapshot(newUserName, rawFrame);
      if (apiResponse !== null) {
        setProcessedFrame(apiResponse.framed_image);
      }
    } catch (error) {
      setApiFailureCount(apiFailureCount + 1);
    }
  };

  const handleIdentifyFrame = async (rawFrame) => {
    try {
      const apiResponse = await getIdentityFromSnapshot(rawFrame);
      if (apiResponse !== null) {
        setProcessedFrame(apiResponse.framed_image);
        setIdentity(apiResponse.name);
        setConfidence(apiResponse.confidence);
        setApiFailureCount(0);
      }
    } catch (error) {
      setApiFailureCount(apiFailureCount + 1);
    }
  };

  useEffect(() => {
    // check api status on page load
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
