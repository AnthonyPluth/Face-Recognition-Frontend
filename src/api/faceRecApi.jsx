import axios from "axios";

export const getIdentityFromSnapshot = async (snapshot) => {
  try {
    const response = await axios.post("https://192.168.30.33:5000/identify", {
      body: JSON.stringify({ snapshot }),
    });
    console.log(response.data);
    return response.data;
  } catch {
    return "abc";
  }
};

export const recordSnapshot = async (name, snapshot) => {
  const response = await axios.post(
    `https://192.168.30.33:5000/add_person/${name}`,
    {
      body: JSON.stringify({ snapshot }),
    }
  );
  return response.data;
};

export const trainModel = async (name, snapshot) => {
  const response = await axios.get("https://192.168.30.33:5000/train_model");
  return response.data;
};
