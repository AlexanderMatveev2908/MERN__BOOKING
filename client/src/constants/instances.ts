import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_BACK_DEV_URL
      : import.meta.env.VITE_BACK_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalReq = err.config;
    const isRefreshing = originalReq.url === "/users/refresh-token";

    if (
      err.response?.status === 401 &&
      !originalReq.retry &&
      !isRefreshing &&
      localStorage.getItem("accessToken")
    ) {
      originalReq.retry = true;

      try {
        const {
          data: { accessToken },
        } = await axiosInstance.get("/users/refresh-token");

        localStorage.setItem("accessToken", accessToken);
        originalReq.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(originalReq);
      } catch {
        localStorage.removeItem("accessToken");
        return Promise.reject(new Error("SESSION_EXPIRED"));
      }
    }

    return Promise.reject(err);
  }
);
