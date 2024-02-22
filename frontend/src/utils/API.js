import axios from "axios";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

if (user) headers.Authorization = `Bearer ${user.token}`;

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }

    let { message } = error.response.data;

    if (!message) {
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }

    const errors = {
      errors: error.response.data.errors,
      message,
    };

    toast.error(message);

    throw errors;
  }
);

export default API;
