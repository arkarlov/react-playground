import axiosInstance from "../api/axios";

export const loginRequest = async (email: string, password: string) => {
  const res = await axiosInstance.post("/auth/login", { email, password });

  return res.data.accessToken;
};

export const refreshToken = async () => {
  const res = await axiosInstance.post("/auth/refresh", null);

  return res.data.accessToken;
};

export const logoutRequest = async () => {
  await axiosInstance.post("/auth/logout");
};
