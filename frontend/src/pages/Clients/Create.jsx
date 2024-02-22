import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/utils/Modal";
import { reset, create, index } from "../../app/features/clients/clients.slice";
import FullscreenLoader from "../../components/utils/FullscreenLoader";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date_of_birth: "",
    gender: "Male",
    address: "",
  });

  const { isLoading, errors, isSuccess } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Client created successfully!");

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

  if (isLoading) return <FullscreenLoader />;

  return (
    <Modal title="Create New Client" size="lg">
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
                  required
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
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="contact">
                Contact
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.contact ? "is-invalid" : ""
                  }`}
                />
                {errors.contact && (
                  <div className="invalid-feedback">{errors.contact}</div>
                )}
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="date_of_birth">
                Date of Birth
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.date_of_birth ? "is-invalid" : ""
                  }`}
                />
                {errors.date_of_birth && (
                  <div className="invalid-feedback">{errors.date_of_birth}</div>
                )}
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="gender">
                Select Gender
                <div className="d-flex mt-2">
                  <div className="form-check">
                    <label htmlFor="male">
                      <input
                        id="male"
                        name="gender"
                        type="radio"
                        value="Male"
                        onChange={handleChange}
                        checked={formData.gender === "Male"}
                        className={`form-check-radio ${
                          errors.gender ? "is-invalid" : ""
                        }`}
                      />{" "}
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="female">
                      <input
                        id="female"
                        name="gender"
                        type="radio"
                        value="Female"
                        onChange={handleChange}
                        checked={formData.gender === "Female"}
                        className={`form-check-radio ${
                          errors.gender ? "is-invalid" : ""
                        }`}
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Address
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.address ? "is-invalid" : ""
                  }`}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </label>
            </div>
          </div>
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
