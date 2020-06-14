import axios from "axios";

export const getIdentityFromSnapshot = async (snapshot) => {
  const response = await axios.post("https://localhost:5000/identify", {
    body: JSON.stringify({ snapshot }),
  });
  return response.data;
};

export const recordSnapshot = async (name, snapshot) => {
  const response = await axios.post(
    `https://localhost:5000/add_person/${name}`,
    {
      body: JSON.stringify({ snapshot }),
    }
  );
  return response.data;
};

export const trainModel = async (name, snapshot) => {
  const response = await axios.get("https://localhost:5000/train_model");
  return response.data;
};

export const apiStatus = async () => {
  const response = await axios.get("https://localhost:5000/status");
  return response.data;
};
