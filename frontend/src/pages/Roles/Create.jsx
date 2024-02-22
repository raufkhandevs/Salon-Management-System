import { useCallback, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, create, index } from "../../app/features/roles/roles.slice";
import SideModal from "../../components/utils/SideModal";
import API from "../../utils/API";
import { handleMultipleCheck } from "../../utils/Helpers";
import PermissionsTable from "./Components/PermissionsTable";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    permissions: [],
  });

  const { isLoading, errors, isSuccess } = useSelector((state) => state.roles);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Role created successfully!");
      navigate(-1);
      dispatch(index());
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const fetchData = useCallback(async () => {
    try {
      const response = await API.get(`/api/permissions`);

      const permissionsByModules = {};

      response.data.forEach((permission) => {
        if (!permissionsByModules[permission.module])
          permissionsByModules[permission.module] = [];

        permissionsByModules[permission.module].push(permission);
      });

      setPermissions(permissionsByModules);
    } catch (error) {
      toast.error("Something went wrong! Can't load permissions!");
    }
  }, []);

  useEffect(() => {
    dispatch(reset());

    fetchData();
  }, [dispatch, fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissions = (e) => {
    const checkedPermissions = handleMultipleCheck(e, formData.permissions);

    setFormData({
      ...formData,
      permissions: checkedPermissions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(create(formData));
  };

  return (
    <SideModal title="Create New Role">
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
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </label>
        </div>

        <div className="mb-3">
          <div className="form-label">Select Permissions:</div>
          <PermissionsTable
            permissions={permissions}
            setPermissions={handlePermissions}
          />
          {errors.permissions && (
            <div className="text-danger">{errors.permissions}</div>
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
