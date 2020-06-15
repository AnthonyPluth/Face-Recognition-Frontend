import { noop } from "../../../utils/testUtils";

export const mockRegistrationContextRecording = () => {
  return {
    snapshot: noop(),
    framerate: 100,
    maxScreenshotWidth: 100,
  };
};

export const mockRegistrationContextNotRecording = () => {
  return {
    snapshot: noop(),
    framerate: 100,
    maxScreenshotWidth: 100,
  };
};
