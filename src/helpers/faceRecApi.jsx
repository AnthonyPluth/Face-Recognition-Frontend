import axios from "axios";

export const getIdentityFromSnapshot = async (snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });

  try {
    // test if b64 is valid
    const test = b64_snapshot.split(",")[1];
  } catch {
    return null;
  }

  const response = await axios.post("https://localhost:5000/identify", {
    body: b64_snapshot,
  });
  return response.data;
};

export const recordSnapshot = async (name, snapshot) => {
  const b64_snapshot = JSON.stringify({ snapshot });

  try {
    // test if b64 is valid
    const test = b64_snapshot.split(",")[1];
  } catch {
    return null;
  }

  const response = await axios.post(
    `https://localhost:5000/add_person/${name}`,
    {
      body: b64_snapshot,
    }
  );
  return response.data;
};

export const apiTrainModel = async (name, snapshot) => {
  const response = await axios.get("https://localhost:5000/train_model");
  return response.data;
};

export const getApiStatus = async () => {
  const response = await axios.get("https://localhost:5000/status");
  return response.data;
};
