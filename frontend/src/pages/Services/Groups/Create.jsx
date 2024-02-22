import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../../components/utils/Modal";
import {
  reset,
  create,
  index,
} from "../../../app/features/groups/groups.slice";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
  });

  const { isLoading, errors, isSuccess } = useSelector((state) => state.groups);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Group created successfully!");

      navigate(-1);

      dispatch(index());
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Create;
