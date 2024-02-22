import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import { RiShieldUserLine } from "react-icons/ri";
import { Table } from "antd";
import useTableSearch from "../../components/utils/useTableSearch";
import { destroy, index } from "../../app/features/roles/roles.slice";
import PillButton from "../../components/utils/PillButton";
import Layout from "../../components/Layout";
import Container from "../../components/utils/Container";
import Can from "../../components/utils/Authorization/Can";
import CanAny from "../../components/utils/Authorization/CanAny";

function Index() {
  const { roles, isLoading } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const [toDelete, setToDelete] = useState(null);

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
      title: "Role",
      dataIndex: "name",
      key: "name",
      ...useTableSearch("name"),
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
      render: (users) =>
        users.map((user) => (
          <div key={`users-${user.id}`} className="badge bg-primary me-2">
            {user.name}
          </div>
        )),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) =>
        permissions.map((permission) => (
          <div
            key={`role-permissions-${permission.id}`}
            className="badge bg-primary me-2"
          >
            {permission.name}
          </div>
        )),
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
      title: "Joining Date",
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
        <CanAny
          permissions={["edit-roles", "delete-roles"]}
          fallback={<span>None</span>}
        >
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
              <Can permission="edit-roles">
                <Dropdown.Item
                  as={Link}
                  to={`/roles-and-permissions/edit/${id}`}
                >
                  Edit
                </Dropdown.Item>
              </Can>
              <Can permission="delete-roles">
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
                <RiShieldUserLine size={50} className="me-3" />
                Roles &amp; Permissions
              </h1>
              <Can permission="create-roles">
                <Link to="/roles-and-permissions/create">
                  <PillButton text="Create" icon={<FaPlusCircle />} />
                </Link>
              </Can>
            </div>

            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={roles}
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
