import API from "../../../utils/API";

// Get all invoices
const index = async () => {
  const response = await API.get(`/api/invoices`);

  return response.data;
};

// Get invoice by id
const show = async (id) => {
  const response = await API.get(`/api/invoices/${id}`);

  return response.data;
};

// Create invoices
const create = async (invoice) => {
  const response = await API.post(`/api/invoices`, invoice);

  return response.data;
};

// Update invoices
const update = async (invoice) => {
  const response = await API.patch(`/api/invoices/${invoice.id}`, invoice);

  return response.data;
};

// Delete invoice
const destroy = async (id) => {
  await API.delete(`/api/invoices/${id}`);

  return id;
};

const invoicesService = {
  index,
  show,
  create,
  update,
  destroy,
};

export default invoicesService;
