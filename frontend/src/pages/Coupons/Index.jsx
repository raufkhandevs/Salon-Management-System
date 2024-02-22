import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { RiUserStarLine } from "react-icons/ri";
import { Table } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import useTableSearch from "../../components/utils/useTableSearch";
import { index, destroy } from "../../app/features/coupons/coupons.slice";
import PillButton from "../../components/utils/PillButton";
import Layout from "../../components/Layout";
import Container from "../../components/utils/Container";
import Can from "../../components/utils/Authorization/Can";
import CanAny from "../../components/utils/Authorization/CanAny";

function Index() {
  const [toDelete, setToDelete] = useState(null);
  const { coupons, isLoading } = useSelector((state) => state.coupons);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(destroy(toDelete));

    setToDelete(null);
  };

  useEffect(() => {
    dispatch(index());
  }, [dispatch]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...useTableSearch("name"),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      ...useTableSearch("code"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (offer, coupon) => (
        <span>
          {offer}
          {coupon.unit === "percentage" ? "%" : " Rs"}
        </span>
      ),
    },
    {
      title: "Total Discounts",
      dataIndex: "total_discounts",
      key: "total_discounts",
      render: (totalDiscounts) => <span>{totalDiscounts} Rs</span>,
      sorter: (a, b) => a.total_discounts - b.total_discounts,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      render: (date) => (
        <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
      ),
      sorter: (a, b) => a.expiry_date > b.expiry_date,
    },
    {
      title: "Last Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => (
        <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => (
        <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <CanAny permissions={["edit-coupons", "delete-coupons"]}>
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
              <Can permission="edit-coupons">
                <Dropdown.Item as={Link} to={`/coupons/edit/${id}`}>
                  Edit
                </Dropdown.Item>
              </Can>
              <Can permission="delete-coupons">
                <Dropdown.Item as="button" onClick={() => setToDelete(id)}>
                  Delete
                </Dropdown.Item>
              </Can>
            </Dropdown.Menu>
          </Dropdown>
        </CanAny>
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
                <RiUserStarLine size={50} className="me-3" />
                Coupons
              </h1>
              <Can permission="create-coupons">
                <Link to="/coupons/create">
                  <PillButton text="Create" icon={<FaPlusCircle />} />
                </Link>
              </Can>
            </div>

            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={coupons}
            />
          </div>
        </div>
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
        <Outlet />
      </Container>
    </Layout>
  );
}

export default Index;
