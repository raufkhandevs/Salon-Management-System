import { useEffect, useState } from "react";

import {
  RiBillLine,
  RiCouponLine,
  RiEye2Line,
  RiUserAddLine,
  RiUserStarLine,
} from "react-icons/ri";
import { Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { easings, useSpring, animated } from "react-spring";
import Layout from "../components/Layout";
import Container from "../components/utils/Container";
import PageHeader from "../components/utils/PageHeader";
import API from "../utils/API";
import Role from "../components/utils/Authorization/Role";

const clientsColumn = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Total Sales",
    dataIndex: "total_sales",
    key: "total_sales",
    render: (totalSales) => (
      <span>{totalSales ? `${totalSales} PKR` : "None"}</span>
    ),
  },
  {
    title: "First Sale On",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => (
      <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
    ),
  },
];

const invoicesColumn = [
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
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (total) => <span>{total} PKR</span>,
  },
  {
    title: "Bill Date",
    dataIndex: "bill_date",
    key: "bill_date",
    render: (date) => (
      <span>{moment(date, "YYYY-MM-DD").format("DD/MM/YY")}</span>
    ),
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "x",
    render: (id) => (
      <Link to={`/invoices/${id}`}>
        <RiEye2Line />
      </Link>
    ),
  },
];

function Dashboard() {
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    const response = await API.get("/api/dashboard");
    setStats(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = useSpring({
    loop: false,
    config: {
      easing: easings.easeOutSine,
      duration: 600,
    },
    delay: 200,
    from: { left: "100%", opacity: 0 },
    to: { left: "0%", opacity: 1 },
  });

  const tables = useSpring({
    loop: false,
    config: {
      easing: easings.easeOutSine,
      duration: 600,
    },
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Layout>
      <PageHeader title="Dashboard" />

      <Container>
        <div className="row mt-4">
          <div className="col-md-3">
            <animated.div style={items} className="position-relative">
              <div
                className="card shadow border-0 px-3"
                style={{ borderRadius: "2rem" }}
              >
                <div className="card-body">
                  <RiCouponLine size={60} className="pb-2" />
                  <div className="h4 mb-0">
                    {stats.totalSalesToday
                      ? `${stats.totalSalesToday} PKR`
                      : "None"}
                  </div>
                  <h2 className="h6 mb-0">Income</h2>
                  <div className="small text-muted mb-0">Today</div>
                </div>
              </div>
            </animated.div>
          </div>
          <Role userRole="Superadmin">
            <div className="col-md-3">
              <animated.div style={items} className="position-relative">
                <div
                  className="card shadow border-0 px-3"
                  style={{ borderRadius: "2rem" }}
                >
                  <div className="card-body">
                    <RiBillLine size={60} className="pb-2" />
                    <div className="h4 mb-0">
                      {stats.totalSales ? `${stats.totalSales} PKR` : "None"}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="h6 mb-0">Income</h2>
                    </div>
                    <div className="small text-muted">Overall</div>
                  </div>
                </div>
              </animated.div>
            </div>
          </Role>
          <div className="col-md-3">
            <animated.div style={items} className="position-relative">
              <div
                className="card shadow border-0 px-3"
                style={{ borderRadius: "2rem" }}
              >
                <div className="card-body">
                  <RiUserStarLine size={60} className="pb-2" />
                  <div className="h4 mb-0">
                    {stats.totalClients ? stats.totalClients : "None"}
                  </div>
                  <h2 className="h6 mb-0">Total Clients</h2>
                  <div className="small text-muted">All Time</div>
                </div>
              </div>
            </animated.div>
          </div>
          <div className="col-md-3">
            <animated.div style={items} className="position-relative">
              <div
                className="card shadow border-0 px-3"
                style={{ borderRadius: "2rem" }}
              >
                <div className="card-body">
                  <RiUserAddLine size={60} className="pb-2" />
                  <div className="h4 mb-0">
                    {stats.clientsThisMonth ? stats.clientsThisMonth : "None"}
                  </div>
                  <h2 className="h6 mb-0">New Clients</h2>
                  <div className="small text-muted">This Month</div>
                </div>
              </div>
            </animated.div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <animated.div style={tables} className="position-relative">
              <div className="card border-0 shadow">
                <div className="card-header">Recent Invoices</div>
                <div className="card-body">
                  <Table
                    columns={invoicesColumn}
                    bordered
                    dataSource={stats.invoices}
                  />
                </div>
              </div>
            </animated.div>
          </div>
          <div className="col-md-6">
            <animated.div style={tables} className="position-relative">
              <div className="card border-0 shadow">
                <div className="card-header">Recent Clients</div>
                <div className="card-body">
                  <Table
                    columns={clientsColumn}
                    bordered
                    dataSource={stats.clients}
                  />
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Dashboard;
