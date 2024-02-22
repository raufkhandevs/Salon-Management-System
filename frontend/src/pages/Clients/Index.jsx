import { useEffect } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { RiUserStarLine } from "react-icons/ri";
import { Table } from "antd";
import useTableSearch from "../../components/utils/useTableSearch";
import { index } from "../../app/features/clients/clients.slice";
import PillButton from "../../components/utils/PillButton";
import Layout from "../../components/Layout";
import Container from "../../components/utils/Container";
import Can from "../../components/utils/Authorization/Can";
import CanAny from "../../components/utils/Authorization/CanAny";

function Index() {
  const { clients, isLoading } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

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
      title: "Total Sales",
      dataIndex: "total_sales",
      key: "total_sales",
      render: (totalSales) => (
        <span>{totalSales ? `${totalSales} PKR` : "None"}</span>
      ),
      sorter: (a, b) => a.total_sales - b.total_sales,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (totalSales) => (
        <span>{totalSales ? `${totalSales} PKR` : "None"}</span>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      ...useTableSearch("contact"),
    },
    {
      title: "First Sale On",
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
        <CanAny permissions={["edit-clients"]} fallback={<span>None</span>}>
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
              {/* <Can permission="view-clients">
                <Dropdown.Item as={Link} to={`/clients/${id}`}>
                  View
                </Dropdown.Item>
              </Can> */}
              <Can permission="edit-clients">
                <Dropdown.Item as={Link} to={`/clients/edit/${id}`}>
                  Edit
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
                Clients
              </h1>
              <Can permission="create-clients">
                <Link to="/clients/create">
                  <PillButton text="Create" icon={<FaPlusCircle />} />
                </Link>
              </Can>
            </div>

            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={clients}
            />
          </div>
        </div>
        <Outlet />
      </Container>
    </Layout>
  );
}

export default Index;
