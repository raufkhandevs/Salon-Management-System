import API from "../../../utils/API";

// Index role
const index = async () => {
  const response = await API.get(`/api/roles`);

  return response.data;
};

// Create role
const create = async (role) => {
  const response = await API.post(`/api/roles`, role);

  return response.data;
};

// Update role
const update = async (role) => {
  const response = await API.patch(`/api/roles/${role.id}`, role);

  return response.data;
};

// Delete role
const destroy = async (id) => {
  await API.delete(`/api/roles/${id}`);

  return id;
};

const rolesService = {
  index,
  create,
  update,
  destroy,
};

export default rolesService;
