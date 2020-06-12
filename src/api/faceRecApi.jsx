import axios from "axios";

export const getIdentityFromSnapshot = async (snapshot) => {
  const response = await axios.post("http://localhost:5000/identify", {
    body: JSON.stringify({ snapshot }),
  });
  return response.data;
};

export const recordSnapshot = async (name, snapshot) => {
  const response = await axios.post(
    `http://localhost:5000/add_person/${name}`,
    {
      body: JSON.stringify({ snapshot }),
    }
  );
  return response.data;
};

export const trainModel = async (name, snapshot) => {
  const response = await axios.get("http://localhost:5000/train_model");
  return response.data;
};
