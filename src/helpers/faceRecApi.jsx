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

export const getIdentityFromSnapshot = async (rws, snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });
  if (validBase64(b64_snapshot)) {
    rws.send(JSON.stringify({ identify: { snapshot: b64_snapshot } }));
  }
};

export const recordSnapshot = async (rws, name, snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });
  if (validBase64(b64_snapshot)) {
    rws.send(
      JSON.stringify({ record: { name: `${name}`, snapshot: b64_snapshot } })
    );
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
    const response = await axios.get(`http://192.168.60.194:8080/status`);
    return response.data;
  } catch {
    return null;
  }
};
