import API from "../../../utils/API";

// Get all groups
const index = async () => {
  const response = await API.get(`/api/groups`);

  return response.data;
};

// Create group
const create = async (group) => {
  const response = await API.post(`/api/groups`, group);

  return response.data;
};

// Update group
const update = async (group) => {
  const response = await API.patch(`/api/groups/${group.id}`, group);

  return response.data;
};

// Delete group
const destroy = async (id) => {
  await API.delete(`/api/groups/${id}`);

  return id;
};

const groupsService = {
  index,
  create,
  update,
  destroy,
};

export default groupsService;
