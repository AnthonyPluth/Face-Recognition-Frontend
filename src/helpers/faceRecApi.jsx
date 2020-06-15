import axios from "axios";

export const getIdentityFromSnapshot = async (snapshot) => {
  try {
    // test if b64 is valid
    const b64_snapshot = JSON.stringify({ snapshot });
    const test = b64_snapshot.split(",")[1];

    const response = await axios.post("https://localhost:5000/identify", {
      body: b64_snapshot,
    });
    console.log("SUCCESS");
    return response.data;
  } catch {
    return null;
  }
};

export const recordSnapshot = async (name, snapshot) => {
  try {
    // test if b64 is valid
    const b64_snapshot = JSON.stringify({ snapshot });
    const test = b64_snapshot.split(",")[1];

    const response = await axios.post(
      `https://localhost:5000/add_person/${name}`,
      {
        body: JSON.stringify({ snapshot }),
      }
    );
    return response.data;
  } catch {
    return null;
  }
};

export const apiTrainModel = async (name, snapshot) => {
  const response = await axios.get("https://localhost:5000/train_model");
  return response.data;
};

export const getApiStatus = async () => {
  const response = await axios.get("https://localhost:5000/status");
  return response.data;
};
