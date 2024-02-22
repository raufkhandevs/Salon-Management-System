import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/utils/Modal";
import {
  reset,
  update,
  index,
} from "../../app/features/services/services.slice";
import { index as groupIndex } from "../../app/features/groups/groups.slice";
import FullscreenLoader from "../../components/utils/FullscreenLoader";
import API from "../../utils/API";

function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    group_id: null,
  });

  async function fetchData() {
    try {
      const response = await API.get(`/api/services/${params.id}`);
      setFormData({
        ...response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { isLoading, errors, isSuccess } = useSelector(
    (state) => state.services
  );

  const { groups } = useSelector((state) => state.groups);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Service updated successfully!");

      navigate(-1);

      dispatch(index());
    }

    dispatch(reset());
    dispatch(groupIndex());
  }, [isSuccess, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(update(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!formData.name || isLoading) return <FullscreenLoader />;

  return (
    <Modal title={`Edit Service (${formData.name})`} size="lg">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name <span className="text-danger">*</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.name ? "is-invalid" : ""
                  }`}
                />
              </label>
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                Price <span className="text-danger">*</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.price ? "is-invalid" : ""
                  }`}
                />
              </label>
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className={`form-control form-control-lg ${
                errors.description ? "is-invalid" : ""
              }`}
            />
          </label>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="group_id">
            Group <span className="text-danger">*</span>
            <select
              name="group_id"
              id="group_id"
              value={formData.group_id}
              onChange={handleChange}
              className={`form-control form-control-lg ${
                errors.group_id ? "is-invalid" : ""
              }`}
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={`service-group-${group.id}`} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
          {errors.group_id && (
            <div className="invalid-feedback">{errors.group_id}</div>
          )}
        </div>

        <hr />

        <div className="text-end">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Edit;
