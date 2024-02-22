import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { RiBillLine } from "react-icons/ri";
import { Table } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import { index, destroy } from "../../app/features/invoices/invoices.slice";
import PillButton from "../../components/utils/PillButton";
import Layout from "../../components/Layout";
import Container from "../../components/utils/Container";
import Can from "../../components/utils/Authorization/Can";

function Index() {
  const [toDelete, setToDelete] = useState(null);
  const { invoices, isLoading } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(index());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(destroy(toDelete));

    setToDelete(null);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (client) => <span>{client.name}</span>,
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services) =>
        services.map((service) => (
          <span className="badge bg-primary d-inline-block me-2">{`${service.service.name} @ ${service.price} Rs`}</span>
        )),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount, row) => (
        <span>
          {row.discount_amount ? `${row.discount_amount} PKR` : "None"}
        </span>
      ),
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (paymentMethod) => (
        <span className="text-capitalize">{paymentMethod}</span>
      ),
    },
    {
      title: "Coupon",
      dataIndex: "coupon",
      key: "coupon",
      render: (coupon) => <span>{coupon ? coupon.code : "None"}</span>,
    },
    {
      title: "Cashier",
      dataIndex: "cashier",
      key: "cashier",
      render: (cashier) => <span>{cashier.name}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => <span>{total} PKR</span>,
    },
    {
      title: "Billing Date",
      dataIndex: "bill_date",
      key: "bill_date",
      render: (date) => (
        <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
      ),
      sorter: (a, b) => a.created_at > b.created_at,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <Dropdown>
          <Dropdown.Toggle
            variant="dark"
            size="sm"
            as="button"
            className="btn btn-text btn-sm"
          >
            <FaEllipsisH />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/invoices/${id}`}>
              View
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/prints/invoices/${id}`}>
              Print
            </Dropdown.Item>
            <Can permission="delete-invoices">
              <Dropdown.Item as="button" onClick={() => setToDelete(id)}>
                Delete
              </Dropdown.Item>
            </Can>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout>
      <Container>
        <div
          className="card shadow border-0 mt-4"
          style={{ minHeight: "calc(100vh - 300px)" }}
        >
          <div className="card-body">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h1 className="mb-0">
                <RiBillLine size={50} className="me-3" />
                Invoices
              </h1>
              <Can permission="create-invoices">
                <Link to="/quicksale">
                  <PillButton text="Create" icon={<FaPlusCircle />} />
                </Link>
              </Can>
            </div>
            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={invoices}
            />
          </div>
        </div>
        <Outlet />
        {toDelete && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Confirm"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="secondary"
            title="Are you sure?"
            onConfirm={handleDelete}
            onCancel={() => setToDelete(null)}
            focusCancelBtn
          >
            You will not be able to recover this data!
          </SweetAlert>
        )}
      </Container>
    </Layout>
  );
}

export default Index;
