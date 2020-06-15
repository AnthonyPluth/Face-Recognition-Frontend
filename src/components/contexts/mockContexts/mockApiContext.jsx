export const mockApiContextCpu = () => {
  return {
    tensorflowGpu: false,
  };
};

export const mockApiContextGpu = () => {
  return {
    tensorflowGpu: true,
  };
};

export const mockApiContextRecording = () => {
  return {
    isRecording: true,
  };
};

export const mockApiContextNotRecording = () => {
  return {
    isRecording: false,
  };
};
