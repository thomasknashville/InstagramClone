import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

axiosInstance.get("/pics").then((response) => {
  console.log({ response });
});

// fetch pics
export const fetchPics = async () => {
  const { data } = await axiosInstance.get("/pics");
  return data;
};

// fetch pic size
export const fetchPicSize = async (e) => {
  const { data } = await axiosInstance.get(`/pics/${e.target.name.substring(9)}`);
  console.log(data.size);
  const fileBytes = JSON.stringify(data.size / 1000) + "kb";
  console.log(fileBytes);
  return fileBytes;
};

// upload pic
export const uploadPic = async (data) => {
  const formData = new FormData();
  formData.append("photo", data);
  await axiosInstance.post("/pics", formData);
};
