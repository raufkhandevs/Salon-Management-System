import {
  RiBankCard2Line,
  RiBillLine,
  RiDeleteBin2Line,
  RiMoneyDollarCircleLine,
  RiSettings2Line,
  RiUserAddFill,
} from "react-icons/ri";
import { Button as AntButton, Input, Select } from "antd";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { index as servicesIndex } from "../../app/features/services/services.slice";
import { index as staffIndex } from "../../app/features/staff/staff.slice";
import { index as clientsIndex } from "../../app/features/clients/clients.slice";
import { index as couponsIndex } from "../../app/features/coupons/coupons.slice";
import {
  create as createInvoice,
  reset,
} from "../../app/features/invoices/invoices.slice";
import Container from "../../components/utils/Container";
import Layout from "../../components/Layout";
import { isInThePast } from "../../utils/Helpers";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((store) => store);

  const [coupons, setCoupons] = useState([]);

  const {
    staff: { users },
    invoices: { invoice, isSuccess },
    services: { services },
    clients: { clients },
    coupons: { coupons: allCoupons },
  } = state;

  useEffect(() => {
    if (allCoupons.length > 0)
      setCoupons(
        allCoupons.filter(
          (coupon) => !isInThePast(new Date(coupon.expiry_date))
        )
      );
  }, [allCoupons]);

  const initialState = {
    client_id: "",
    bill_date: moment().format("YYYY-MM-DD"),
    services: [
      {
        id: uuidv4(),
        service_id: "",
        user_id: "",
        price: 0,
      },
    ],
    discount: 0,
    dicount_amount: 0,
    discount_unit: "",
    extra_charges: 0,
    payment_method: "Cash",
    coupon_id: "",
    notes: "",
    subtotal: 0,
    total: 0,
  };

  const [formData, setFormData] = useState(initialState);

  const resetForm = () => {
    setFormData(initialState);
  };

  useEffect(() => {
    dispatch(staffIndex());
    dispatch(servicesIndex());
    dispatch(clientsIndex());
    dispatch(couponsIndex());
  }, [dispatch]);

  const updateState = (currentState) => {
    let subtotal = 0;
    let { discount } = currentState;
    let { discount_amount: discountAmount } = currentState;
    let { discount_unit: discountUnit } = currentState;
    let total = 0;

    currentState.services.forEach((service) => {
      subtotal += parseInt(service.price, 10);
    });

    total = subtotal;

    if (currentState.coupon_id) {
      const coupon = coupons.find((rec) => rec.id === currentState.coupon_id);

      if (coupon.unit === "percentage") {
        discount = parseInt(coupon.offer, 10);
        discountAmount = (discount / 100) * subtotal;
        discountUnit = coupon.unit;
      } else {
        discountAmount = parseInt(coupon.offer, 10);
        discountUnit = coupon.unit;
      }
    } else if (discount && discountUnit) {
      if (discountUnit === "percentage") {
        discountAmount = (parseInt(discount, 10) / 100) * subtotal;
      } else {
        discountAmount = parseInt(discount, 10);
      }
    }
    if (discountAmount) {
      total = total - discountAmount + parseInt(currentState.extra_charges, 10);
    } else {
      total += parseInt(currentState.extra_charges, 10);
    }

    setFormData({
      ...currentState,
      subtotal,
      discount,
      discount_amount: discountAmount,
      discount_unit: discountUnit,
      total,
    });
  };

  const handleChange = (e) => {
    updateState({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value, option) => {
    if (value === "add_new_client") navigate("/quicksale/clients/create");

    if (option.name === "coupon_id" && !option.value) {
      updateState({
        ...formData,
        discount: 0,
        discount_amount: 0,
        discount_unit: "",
        [option.name]: option.value,
      });
    } else {
      updateState({ ...formData, [option.name]: option.value });
    }
  };

  const setPaymentMethod = (value) => {
    setFormData({ ...formData, payment_method: value });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        {
          id: uuidv4(),
          service_id: "",
          user_id: "",
          price: 0,
        },
      ],
    });
  };

  const removeService = (id) => {
    const updatedServices = formData.services.filter(
      (service) => service.id !== id
    );

    updateState({ ...formData, services: updatedServices });
  };

  const updateService = (id, option) => {
    const updatedServices = formData.services.map((service) => {
      if (service.id !== id) return service;

      if (option.name === "service_id") {
        const { price } = services.find((rec) => rec.id === option.value);

        return {
          ...service,
          [option.name]: option.value,
          price,
        };
      }

      return {
        ...service,
        [option.name]: option.value,
      };
    });

    updateState({ ...formData, services: updatedServices });
  };

  useEffect(() => {
    if (isSuccess && invoice) {
      toast.success("Invoice created successfully!");

      navigate(`/invoices/${invoice.id}`);
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch, invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createInvoice(formData));
  };

  const handleFilterOptions = (input, option) => {
    const value = option.children;

    if (typeof value === "string")
      return value.toLowerCase().includes(input.toLowerCase());

    if (typeof value[0] === "string")
      return value[0].toLowerCase().includes(input.toLowerCase());

    if (typeof value[1] === "string")
      return value[1].toLowerCase().includes(input.toLowerCase());

    return null;
  };

  return (
    <Layout>
      <Container>
        <div
          className="card shadow border-0 mt-4 mb-5"
          style={{ minminHeight: "calc(100vh - 300px)" }}
        >
          <div className="card-body">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h1 className="mb-0">
                <RiBillLine size={50} className="me-3" />
                Create Invoice
              </h1>
            </div>

            <hr />

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Select
                    size="large"
                    style={{ width: "100%" }}
                    showSearch
                    onSelect={handleSelect}
                    optionFilterProp="children"
                    value={formData.client_id}
                    filterOption={handleFilterOptions}
                  >
                    <Select.Option name="client_id" value="">
                      Select a customer <span className="text-danger">*</span>
                    </Select.Option>
                    <Select.Option name="client_id" value="add_new_client">
                      <RiUserAddFill className="text-success me-2" />
                      Add new customer
                    </Select.Option>
                    {clients.map((client) => (
                      <Select.Option
                        name="client_id"
                        key={`client-${client.id}`}
                        value={client.id}
                      >
                        {`${client.name} ${
                          client.contact ? `<${client.contact}>` : ""
                        }`}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="col-md-6 mb-3">
                  <Input
                    required
                    addonBefore={
                      <span>
                        Bill Date <span className="text-danger">*</span>
                      </span>
                    }
                    name="bill_date"
                    max={moment().format("YYYY-MM-DD")}
                    value={formData.bill_date}
                    onChange={handleChange}
                    size="large"
                    type="date"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  {/* Services to be added here */}
                  <div
                    className="row mb-2 px-2 mx-1 py-3"
                    style={{ background: "#ECEEF2" }}
                  >
                    <div className="col-md-12 mb-2 fw-bold">
                      Availed Services:
                    </div>
                    {formData.services.map((formService) => (
                      <div
                        className="row col-md-12 mb-2"
                        key={`form-service-${formService.id}`}
                      >
                        <div className="me-2" style={{ flex: 4 }}>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            value={formService.service_id}
                            onSelect={(value, option) =>
                              updateService(formService.id, option)
                            }
                            optionFilterProp="children"
                            filterOption={handleFilterOptions}
                          >
                            <Select.Option name="service_id" value="">
                              Select service{" "}
                              <span className="text-danger">*</span>
                            </Select.Option>
                            {services.map((service) => (
                              <Select.Option
                                key={`service-${service.id}`}
                                name="service_id"
                                value={service.id}
                              >
                                {service.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                        <div className="me-2" style={{ flex: 4 }}>
                          <Select
                            onSelect={(value, option) =>
                              updateService(formService.id, option)
                            }
                            value={formService.user_id}
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={handleFilterOptions}
                          >
                            <Select.Option name="user_id" value="">
                              Select staff member
                            </Select.Option>
                            {users.map((user) => (
                              <Select.Option
                                name="user_id"
                                key={`user-${user.id}`}
                                value={user.id}
                              >
                                {user.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                        <div style={{ flex: 4 }}>
                          <Input
                            required
                            addonBefore="Amount"
                            value={formService.price}
                            type="number"
                            readOnly
                            className="w-100"
                          />
                        </div>
                        {formData.services.length > 1 && (
                          <div className="ms-2" style={{ flex: 1 }}>
                            <Button
                              variant="outline-danger"
                              className="d-block w-100"
                              type="button"
                              color="danger"
                              onClick={() => removeService(formService.id)}
                            >
                              <RiDeleteBin2Line />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-end">
                    <Button type="button" color="primary" onClick={addService}>
                      Add Services
                      <RiSettings2Line className="ms-2" />
                    </Button>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    addonBefore="Discount"
                    size="large"
                    type="number"
                    max={
                      formData.discount_unit === "percentage"
                        ? 100
                        : formData.subtotal
                    }
                    placeholder="Amount/Percentage"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Select
                    size="large"
                    value={formData.discount_unit}
                    style={{ width: "100%" }}
                    onSelect={handleSelect}
                  >
                    <Select.Option value="" name="discount_unit">
                      Discount Type
                    </Select.Option>
                    <Select.Option name="discount_unit" value="percentage">
                      Percentage (%)
                    </Select.Option>
                    <Select.Option name="discount_unit" value="value">
                      Value (Rs)
                    </Select.Option>
                  </Select>
                </div>
                <div className="col-md-4 mb-3">
                  <Input
                    name="extra_charges"
                    type="number"
                    addonBefore="Extra Charges"
                    placeholder="Amount in Rs."
                    size="large"
                    value={formData.extra_charges}
                    onChange={handleChange}
                  />
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="row align-items-end">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <span className="small mb-2">
                          Payment Method <span className="text-danger">*</span>
                        </span>
                        <div className="d-flex">
                          <AntButton
                            style={{ flex: 1, borderRadius: 0 }}
                            onClick={() => setPaymentMethod("Cash")}
                            type={
                              formData.payment_method === "Cash"
                                ? "primary"
                                : "ghost"
                            }
                          >
                            <RiMoneyDollarCircleLine />{" "}
                            <span className="ms-2">Cash</span>
                          </AntButton>
                          <AntButton
                            style={{ flex: 1, borderRadius: 0 }}
                            onClick={() =>
                              setPaymentMethod("Debit/Credit Card")
                            }
                            type={
                              formData.payment_method === "Debit/Credit Card"
                                ? "primary"
                                : "ghost"
                            }
                          >
                            <RiBankCard2Line />{" "}
                            <span className="ms-2">Debit/Credit Card</span>
                          </AntButton>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Input.Group compact size="large">
                          <Select
                            size="large"
                            style={{ width: "100%" }}
                            value={formData.coupon_id}
                            onSelect={handleSelect}
                          >
                            <Select.Option value="" name="coupon_id">
                              Select Coupon Code
                            </Select.Option>
                            {coupons.map((coupon) => (
                              <Select.Option
                                key={`coupon-${coupon.id}`}
                                name="coupon_id"
                                value={coupon.id}
                              >
                                {coupon.code}
                              </Select.Option>
                            ))}
                          </Select>
                        </Input.Group>
                      </div>
                      <div>
                        <Input.TextArea
                          rows={10}
                          placeholder="Enter notes"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <table className="table table-bordered table-striped mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Sub Total (Rs):</th>
                            <td>{formData.subtotal}</td>
                          </tr>
                          <tr>
                            <th scope="row">Discount (Rs)</th>
                            <td>{formData.discount_amount}</td>
                          </tr>
                          <tr>
                            <th scope="row">Extra Charges (Rs)</th>
                            <td>{formData.extra_charges}</td>
                          </tr>
                          <tr>
                            <th scope="row">Grand Total (Rs):</th>
                            <td>{formData.total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-end">
                <Button
                  type="reset"
                  variant="outline-primary"
                  className="me-3"
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button type="submit" variant="primary">
                  Generate Bill
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Outlet />
    </Layout>
  );
}

export default Index;
