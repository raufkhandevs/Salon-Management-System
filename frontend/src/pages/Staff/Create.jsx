import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create, index, reset } from "../../app/features/staff/staff.slice";
import SideModal from "../../components/utils/SideModal";
import API from "../../utils/API";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    roles: [],
  });

  const [roles, setRoles] = useState([]);

  const { isLoading, errors, isSuccess } = useSelector((state) => state.staff);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Staff member added successfully!");
      dispatch(index());
      navigate(-1);
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/api/roles");
      setRoles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(reset());
    fetchRoles();
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [e.target.name]: Array.from(
          e.target.selectedOptions,
          (option) => option.value
        ),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(create(formData));
  };

  return (
    <SideModal title="Create Staff Member">
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
              className={`form-control form-control-lg ${
                errors.name ? "is-invalid" : ""
              }`}
            />
          </label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`form-control form-control-lg ${
                errors.username ? "is-invalid" : ""
              }`}
            />
          </label>
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control form-control-lg ${
                errors.password ? "is-invalid" : ""
              }`}
            />
          </label>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="phone_number">
            Phone Number
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              className={`form-control form-control-lg ${
                errors.phone_number ? "is-invalid" : ""
              }`}
            />
          </label>
          {errors.phone_number && (
            <div className="invalid-feedback">{errors.phone_number}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="roles">
            Roles
            <select
              id="roles"
              name="roles"
              onChange={handleChange}
              value={formData.roles}
              className={`form-select form-select-lg ${
                errors.roles ? "is-invalid" : ""
              }`}
              multiple
            >
              <option value="">Select roles</option>
              {roles.map((role) => (
                <option key={`role-${role.id}`} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
          {errors.roles && (
            <div className="invalid-feedback">{errors.roles}</div>
          )}
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
    </SideModal>
  );
}

export default Create;
