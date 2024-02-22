import API from "../../../utils/API";

// Get All Services
const index = async () => {
  const response = await API.get(`/api/services`);

  return response.data;
};

// Create service
const create = async (service) => {
  const response = await API.post(`/api/services`, service);

  return response.data;
};

// Update service
const update = async (service) => {
  const response = await API.patch(`/api/services/${service.id}`, service);

  return response.data;
};

// Delete service
const destroy = async (id) => {
  await API.delete(`/api/services/${id}`);

  return id;
};

const servicesService = {
  index,
  create,
  update,
  destroy,
};

export default servicesService;
