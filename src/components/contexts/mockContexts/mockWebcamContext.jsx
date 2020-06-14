import { noop } from "../../../utils/testUtils";

export const mockWebcamContext = () => {
  return {
    snapshot: noop(),
    framerate: 100,
    maxScreenshotWidth: 100,
  };
};
