import { useCallback, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SideModal from "../../components/utils/SideModal";
import API from "../../utils/API";
import { handleMultipleCheck } from "../../utils/Helpers";
import PermissionsTable from "./Components/PermissionsTable";
import { reset, update, index } from "../../app/features/roles/roles.slice";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    permissions: [],
  });

  const { isLoading, errors, isSuccess } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(reset());

    if (isSuccess) {
      toast.success("Role updated successfully!");
      dispatch(index());
      navigate(-1);
    }
  }, [isSuccess, navigate, dispatch]);

  const fetchData = useCallback(async () => {
    try {
      const [permissionsResponse, roleResponse] = await Promise.all([
        API.get(`/api/permissions`),
        API.get(`/api/roles/${params.id}`),
      ]);

      const permissionsByModules = {};

      permissionsResponse.data.forEach((permission) => {
        if (!permissionsByModules[permission.module])
          permissionsByModules[permission.module] = [];

        permissionsByModules[permission.module].push(permission);
      });

      setPermissions(permissionsByModules);

      setFormData({
        id: roleResponse.data.id,
        name: roleResponse.data.name,
        permissions: roleResponse.data.permissions.map(
          (permission) => permission.id
        ),
      });
    } catch (error) {
      console.error(error);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

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

  const handlePermissions = (e) => {
    const checkedPermissions = handleMultipleCheck(e, formData.permissions);

    setFormData({
      ...formData,
      permissions: checkedPermissions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(update(formData));
  };

  return (
    <SideModal title={`Edit Role (${formData.name})`}>
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
          <div className="form-label">Roles</div>
          <PermissionsTable
            permissions={permissions}
            defaultPermissions={formData.permissions}
            setPermissions={handlePermissions}
          />
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
            Save Changes
          </button>
        </div>
      </form>
    </SideModal>
  );
}

export default Edit;
