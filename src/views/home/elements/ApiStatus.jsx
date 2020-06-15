import React, { useEffect, useContext, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { RegistrationContext } from "../../../components/contexts/RegistrationContext";
import { ApiContext } from "../../../components/contexts/ApiContext";
import {
  getApiStatus,
  getIdentityFromSnapshot,
  recordSnapshot,
} from "../../../helpers/faceRecApi";
import Countdown from "react-countdown";

export default function ApiStatus() {
  const registrationContext = useContext(RegistrationContext);
  const apiContext = useContext(ApiContext);
  const [apiFailureCount, setApiFailureCount] = useState(0);

  const { frame, isRecording, newUserName } = registrationContext;
  const {
    apiFailed,
    setApiFailed,
    setApiStatus,
    setTensorflowGpu,
    setProcessedFrame,
    setIdentity,
    setConfidence,
    apiRetryTime,
    setApiRetryTime,
  } = apiContext;

  const renderer = ({ seconds }) => {
    if (apiFailed) {
      return (
        <Alert variant="filled" severity="error">
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
      console.log("marking api as down");
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
    // send frame if api is not in failure state
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
      console.log("api entered failed state; setting up ping to check status");
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
