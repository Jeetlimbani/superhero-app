import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    // We only want to handle the 401 error, we don't force a redirect here.
    // The AuthContext and PrivateRoute components will handle the navigation.
    if (error.response?.status === 401) {
      localStorage.removeItem("role");
      // The error is now passed to the component that made the API call.
    }
    return Promise.reject(error);
  }
);

export default API;