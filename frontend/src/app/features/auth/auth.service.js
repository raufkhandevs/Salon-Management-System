import API from "../../../utils/API";

const API_URL = "/api/auth";

// Login user
const login = async (userData) => {
  const response = await API.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  logout,
  login,
};

export default authService;
