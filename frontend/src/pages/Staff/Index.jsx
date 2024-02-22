import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { RiUserSettingsLine } from "react-icons/ri";
import { Table } from "antd";
import Container from "../../components/utils/Container";
import PillButton from "../../components/utils/PillButton";
import Layout from "../../components/Layout";
import { destroy, index } from "../../app/features/staff/staff.slice";
import useTableSearch from "../../components/utils/useTableSearch";
import Can from "../../components/utils/Authorization/Can";
import CanAny from "../../components/utils/Authorization/CanAny";

function Index() {
  const { users, isLoading } = useSelector((state) => state.staff);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...useTableSearch("name"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...useTableSearch("username"),
    },
    {
      title: "Contact",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (roles) =>
        roles.map((role) => (
          <div className="badge bg-primary" key={`user-role-${role.id}`}>
            {role.name}
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
          permissions={["edit-staff", "delete-staff"]}
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
              <Can permission="edit-staff">
                <Dropdown.Item as={Link} to={`/staff/edit/${id}`}>
                  Edit
                </Dropdown.Item>
              </Can>
              <Can permission="delete-staff">
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
                <RiUserSettingsLine className="me-3" size={50} />
                Staff List
              </h1>
              <Can permission="create-staff">
                <Link to="/staff/create">
                  <PillButton text="Create" icon={<FaPlusCircle />} />
                </Link>
              </Can>
            </div>
            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={users}
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
