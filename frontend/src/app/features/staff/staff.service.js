import API from "../../../utils/API";

// Index role
const index = async () => {
  const response = await API.get(`/api/users`);

  return response.data;
};

// Create user
const create = async (userData) => {
  const response = await API.post(`/api/users`, userData);

  return response.data;
};

// Update user
const update = async (userData) => {
  const response = await API.patch(`/api/users/${userData.id}`, userData);

  return response.data;
};

// Delete role
const destroy = async (id) => {
  await API.delete(`/api/users/${id}`);

  return id;
};

const staffService = {
  index,
  create,
  update,
  destroy,
};

export default staffService;
