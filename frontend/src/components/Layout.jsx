import {
  RiBillFill,
  RiBillLine,
  RiCouponLine,
  RiDashboard3Line,
  RiSettings2Line,
  RiShieldUserLine,
  RiUserSettingsLine,
  RiUserStarLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "../css/nav.scss";
import PropTypes from "prop-types";
import Header from "./Header";
import Can from "./utils/Authorization/Can";
import CanAny from "./utils/Authorization/CanAny";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div
        className="d-flex bg-light"
        style={{ height: "calc(100vh - 75px)", overflow: "hidden" }}
      >
        <div
          className="bg-light shadow-lg"
          style={{ width: "400px", height: "100%", overflow: "auto" }}
        >
          <div className="list-group rounded-0" id="main-nav">
            <NavLink to="/" className="list-group-item list-group-item-action">
              <RiDashboard3Line className="me-3" size={24} />
              Dashboard
            </NavLink>
            <Can permission="create-invoices">
              <NavLink
                to="/quicksale"
                className="list-group-item list-group-item-action"
              >
                <RiBillLine className="me-3" size={24} />
                Quicksale
              </NavLink>
            </Can>
            <CanAny
              permissions={[
                "view-invoices",
                "edit-invoices",
                "delete-invoices",
              ]}
            >
              <NavLink
                to="/invoices"
                className="list-group-item list-group-item-action"
              >
                <RiBillFill className="me-3" size={24} />
                Invoices
              </NavLink>
            </CanAny>
            <CanAny
              permissions={[
                "view-services",
                "create-services",
                "edit-services",
                "delete-services",
              ]}
            >
              <NavLink
                to="/services"
                className="list-group-item list-group-item-action"
              >
                <RiSettings2Line className="me-3" size={24} />
                Services
              </NavLink>
            </CanAny>
            <CanAny
              permissions={[
                "view-clients",
                "create-clients",
                "edit-clients",
                "delete-clients",
              ]}
            >
              <NavLink
                to="/clients"
                className="list-group-item list-group-item-action"
              >
                <RiUserStarLine className="me-3" size={24} />
                Clients
              </NavLink>
            </CanAny>
            <CanAny
              permissions={[
                "view-coupons",
                "create-coupons",
                "edit-coupons",
                "delete-coupons",
              ]}
            >
              <NavLink
                to="/coupons"
                className="list-group-item list-group-item-action"
              >
                <RiCouponLine className="me-3" size={24} />
                Coupons
              </NavLink>
            </CanAny>
            {/* <NavLink
            to="/appointments"
            className="list-group-item list-group-item-action"
          >
            <FaCalendarCheck className="me-3" size={24} />
            Appointments
          </NavLink> */}
            <CanAny
              permissions={[
                "view-staff",
                "create-staff",
                "edit-staff",
                "delete-staff",
              ]}
            >
              <NavLink
                to="/staff"
                className="list-group-item list-group-item-action"
              >
                <RiUserSettingsLine className="me-3" size={24} />
                Staff
              </NavLink>
            </CanAny>
            <CanAny
              permissions={[
                "view-roles",
                "create-roles",
                "edit-roles",
                "delete-roles",
              ]}
            >
              <NavLink
                to="/roles-and-permissions"
                className="list-group-item list-group-item-action"
              >
                <RiShieldUserLine className="me-3" size={24} />
                Roles &amp; Permissions
              </NavLink>
            </CanAny>
          </div>
        </div>
        <div
          className="w-100 h-100"
          style={{ overflow: "hidden", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
