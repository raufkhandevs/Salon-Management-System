import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlusCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { RiEdit2Line, RiSettings2Line } from "react-icons/ri";
import { Table } from "antd";
import PillButton from "../../components/utils/PillButton";
import { destroy, index } from "../../app/features/services/services.slice";
import {
  index as groupIndex,
  destroy as groupDestroy,
} from "../../app/features/groups/groups.slice";
import Container from "../../components/utils/Container";
import useTableSearch from "../../components/utils/useTableSearch";
import Layout from "../../components/Layout";
import Can from "../../components/utils/Authorization/Can";
import CanAny from "../../components/utils/Authorization/CanAny";

function Index() {
  const { services, isLoading } = useSelector((state) => state.services);
  const { groups } = useSelector((state) => state.groups);

  const dispatch = useDispatch();
  const [toDelete, setToDelete] = useState(null);

  const handleDelete = () => {
    if (toDelete.resource === "group") {
      dispatch(groupDestroy(toDelete.id));
    } else {
      dispatch(destroy(toDelete.id));
    }
    setToDelete(null);
  };

  useEffect(() => {
    dispatch(index());
    dispatch(groupIndex());
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
      title: "Group",
      dataIndex: "groupName",
      key: "groupName",
      filterSearch: true,
      filters: groups.map((group) => ({
        text: group.name,
        value: group.name,
      })),
      render: (groupName, row) => (
        <div className="d-flex align-items-center justify-content-between">
          <span>{row.group.name}</span>
          <Can permission="edit-groups">
            <div>
              <Link to={`/services/groups/edit/${row.group.id}`}>
                <RiEdit2Line />
              </Link>
            </div>
          </Can>
        </div>
      ),
      onFilter: (value, record) => record.groupName.includes(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
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
        <CanAny
          permissions={["edit-services", "delete-services"]}
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
              <Can permission="edit-services">
                <Dropdown.Item as={Link} to={`/services/edit/${id}`}>
                  Edit
                </Dropdown.Item>
              </Can>
              <Can permission="delete-services">
                <Dropdown.Item
                  as="button"
                  onClick={() =>
                    setToDelete({
                      resource: "service",
                      id,
                    })
                  }
                >
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
                <RiSettings2Line className="me-3" size={50} />
                Services List
              </h1>
              <div>
                <Can permission="create-groups">
                  <Link to="/services/groups/create" className="me-3">
                    <PillButton text="Add Group" icon={<FaPlusCircle />} />
                  </Link>
                </Can>
                <Can permission="create-services">
                  <Link to="/services/create">
                    <PillButton text="Add Service" icon={<FaPlusCircle />} />
                  </Link>
                </Can>
              </div>
            </div>
            <Table
              loading={isLoading}
              columns={columns}
              bordered
              dataSource={services}
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
