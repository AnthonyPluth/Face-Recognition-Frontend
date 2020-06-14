export const mockApiStatusContextCpu = () => {
  return {
    status: "up",
    tensorflowGpu: false,
    tensorflowVersion: "1.15.3",
  };
};

export const mockApiStatusContextGpu = () => {
  return {
    status: "up",
    tensorflowGpu: true,
    tensorflowVersion: "1.15.3",
  };
};
