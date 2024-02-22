import API from "../../../utils/API";

// Get all coupons
const index = async () => {
  const response = await API.get(`/api/coupons`);

  return response.data;
};

// Create coupon
const create = async (coupon) => {
  const response = await API.post(`/api/coupons`, coupon);

  return response.data;
};

// Update coupon
const update = async (coupon) => {
  const response = await API.patch(`/api/coupons/${coupon.id}`, coupon);

  return response.data;
};

// Delete coupon
const destroy = async (id) => {
  await API.delete(`/api/coupons/${id}`);

  return id;
};

const couponsService = {
  index,
  create,
  update,
  destroy,
};

export default couponsService;
