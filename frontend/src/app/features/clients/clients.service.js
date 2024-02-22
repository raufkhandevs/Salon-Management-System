import API from "../../../utils/API";

// Get all clients
const index = async () => {
  const response = await API.get(`/api/clients`);

  return response.data;
};

// Create client
const create = async (client) => {
  const response = await API.post(`/api/clients`, client);

  return response.data;
};

// Update client
const update = async (client) => {
  const response = await API.patch(`/api/clients/${client.id}`, client);

  return response.data;
};

// Delete client
const destroy = async (id) => {
  await API.delete(`/api/clients/${id}`);

  return id;
};

const clientsService = {
  index,
  create,
  update,
  destroy,
};

export default clientsService;
