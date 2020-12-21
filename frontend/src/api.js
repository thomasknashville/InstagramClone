import axios from "axios";

export const API_BASE_URL = "http://localhost:4000";

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

// fetch pics hard mode
// export const fetchPics = async () => {
//   const { data } = await axiosInstance.get("/pics-hard-mode", {
//     params: {
//       size: 200000,
//     },
//   });
//   return data;
// };

// upload pic
export const uploadPic = async (data) => {
  const formData = new FormData();
  formData.append("photo", data);
  await axiosInstance.post("/pics", formData);
};
