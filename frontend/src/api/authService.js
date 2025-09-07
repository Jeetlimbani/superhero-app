import API from "./axiosConfig";

// Register no longer stores a token. It simply confirms success.
export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  // Backend returns user data. Store the role for frontend logic.
  localStorage.setItem("role", response.data.user.role);
  return response;
};

// Login receives the token in a cookie. It only needs to store the user's role.
export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  // Backend returns user data. Store the role for frontend logic.
  localStorage.setItem("role", response.data.user.role);
  return response;
};

export const logoutUser = () => {
  // Clearing the cookie is handled by the backend.
  // We just need to clear the local state.
  localStorage.removeItem("role");
  return API.post("/auth/logout");
};