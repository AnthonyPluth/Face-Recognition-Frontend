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
      console.log("checking status");
      const apiResponse = await getApiStatus();
      setTensorflowGpu(apiResponse.tensorflowGpu);
      setApiStatus(apiResponse.status);
      setApiFailed(false);
      setApiFailureCount(0);
    } catch {
      setApiFailed(true);
      setApiRetryTime(Date.now() + 10000);
    }
  };

  useEffect(() => {
    // update status on page load
    updateApiStatus();
  }, []);

  useEffect(() => {
    // update status every 10 seconds when failing
    if (apiFailed) {
      const interval = setInterval(() => {
        updateApiStatus();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [apiFailed]);

  useEffect(() => {
    console.log(apiFailureCount);
    if (!apiFailed && apiFailureCount >= 5) {
      // setting Api as failing
      setApiFailed(true);
    }
  }, [apiFailureCount]);

  const handleRecordedFrame = async () => {
    if (!apiFailed) {
      try {
        const apiResponse = await recordSnapshot(newUserName, frame);
        if (apiResponse !== null) {
          setProcessedFrame(apiResponse.framed_image);
        }
      } catch (error) {
        setApiFailureCount(apiFailureCount + 1);
      }
    }
  };

  const handleIdentifyFrame = async () => {
    if (!apiFailed) {
      try {
        const apiResponse = await getIdentityFromSnapshot(frame);
        if (apiResponse !== null) {
          setProcessedFrame(apiResponse.framed_image);
          setIdentity(apiResponse.name);
          setConfidence(apiResponse.confidence);
        }
      } catch (error) {
        setApiFailureCount(apiFailureCount + 1);
      }
    }
  };

  if (isRecording) {
    handleRecordedFrame();
  } else {
    handleIdentifyFrame();
  }

  return <Countdown date={apiRetryTime} renderer={renderer} />;
}
