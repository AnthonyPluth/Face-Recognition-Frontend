import axios from "axios";

export const validBase64 = (b64Value) => {
  // test if b64 is valid
  try {
    const test = b64Value.split(",")[1];
    return test !== undefined ? true : false;
  } catch {
    return false;
  }
};

export const getIdentityFromSnapshot = async (snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });
  if (validBase64(b64_snapshot)) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/identify`,
      b64_snapshot
    );
    return response.data;
  }
};

export const recordSnapshot = async (name, snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });
  if (validBase64(b64_snapshot)) {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/add_person/${name}`,
      b64_snapshot
    );
    return response.data;
  }
};

export const apiTrainModel = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URI}/train_model`
  );
  return response.data;
};

export const getApiStatus = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/status`);
    return response.data;
  } catch {
    return null;
  }
};
