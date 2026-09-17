import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Attach token automatically in headers
// api.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     config.headers.delete("Content-Type");
//   }

//   const token = getStoreRef().getState().auth.access_token;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// intercept response -> refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry ||
//       originalRequest.url?.includes("/refresh")
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;
//     try {
//       const { data } = await axios.post(
//         `${api.defaults.baseURL}/auth/refresh`,
//         {},
//         { withCredentials: true },
//       );

//       const newAccessToken = data.access_token;
//       const newUser = data.user;
//       getStoreRef().dispatch(
//         setSession({ access_token: newAccessToken, user: newUser }),
//       );

//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       return api(originalRequest);
//     } catch (refreshError) {
//       getStoreRef().dispatch(clearAuth());
//       if (typeof window !== "undefined") window.location.href = "/login";
//       return Promise.reject(refreshError);
//     }
//   },
// );

export default api;
