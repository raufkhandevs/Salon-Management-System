import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../components/utils/Modal";
import {
  reset,
  update,
  index,
} from "../../../app/features/groups/groups.slice";
import FullscreenLoader from "../../../components/utils/FullscreenLoader";
import API from "../../../utils/API";

function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
  });

  const { isLoading, errors, isSuccess } = useSelector((state) => state.groups);

  async function fetchData() {
    try {
      const response = await API.get(`/api/groups/${params.id}`);
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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Group updated successfully!");

      navigate(-1);

      dispatch(index());
    }

    dispatch(reset());
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
    <Modal title="Create New Group">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
          </label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
