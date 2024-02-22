import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Role({ userRole, children, fallback }) {
  const { user } = useSelector((store) => store.auth);

  if (user.roles.includes("Superadmin") || user.roles.includes(userRole))
    return children;

  return fallback;
}

Role.propTypes = {
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

Role.defaultProps = {
  fallback: null,
};

export default Role;
