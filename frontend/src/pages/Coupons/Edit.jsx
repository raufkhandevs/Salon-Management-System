import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import Modal from "../../components/utils/Modal";
import { reset, update, index } from "../../app/features/coupons/coupons.slice";
import API from "../../utils/API";

function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    offer: "",
    unit: "percentage",
    expiry_date: "",
  });

  async function fetchData() {
    try {
      const response = await API.get(`/api/coupons/${params.id}`);
      setFormData({
        ...response.data,
        expiry_date: response.data.expiry_date
          ? moment(response.data.expiry_date).format("YYYY-MM-DD")
          : "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { isLoading, errors, isSuccess } = useSelector(
    (state) => state.coupons
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon updated successfully!");

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

  return (
    <Modal title={`Edit Coupon (${formData.name})`} size="lg">
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
              <label className="form-label" htmlFor="code">
                Coupon Code <span className="text-danger">*</span>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.code ? "is-invalid" : ""
                  }`}
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="offer">
                Offer <span className="text-danger">*</span>
                <input
                  id="offer"
                  name="offer"
                  type="number"
                  min={1}
                  step={1}
                  max={formData.unit === "percentage" ? 100 : 1000}
                  required
                  value={formData.offer}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.offer ? "is-invalid" : ""
                  }`}
                />
                {errors.offer && (
                  <div className="invalid-feedback">{errors.offer}</div>
                )}
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="expiry_date">
                Expiry Date <span className="text-danger">*</span>
                <input
                  id="expiry_date"
                  name="expiry_date"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  required
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.expiry_date ? "is-invalid" : ""
                  }`}
                />
                {errors.expiry_date && (
                  <div className="invalid-feedback">{errors.expiry_date}</div>
                )}
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="gender">
                Select Unit <span className="text-danger">*</span>
                <div className="d-flex mt-2">
                  <div className="form-check">
                    <label htmlFor="percentage">
                      <input
                        id="percentage"
                        name="unit"
                        type="radio"
                        value="percentage"
                        onChange={handleChange}
                        required
                        checked={formData.unit === "percentage"}
                        className={`form-check-radio ${
                          errors.unit ? "is-invalid" : ""
                        }`}
                      />{" "}
                      Percentage
                    </label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="value">
                      <input
                        id="value"
                        name="unit"
                        type="radio"
                        value="value"
                        required
                        onChange={handleChange}
                        checked={formData.unit === "value"}
                        className={`form-check-radio ${
                          errors.unit ? "is-invalid" : ""
                        }`}
                      />{" "}
                      Value
                    </label>
                  </div>
                </div>
                {errors.unit && (
                  <div className="invalid-feedback">{errors.unit}</div>
                )}
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
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
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Edit;
