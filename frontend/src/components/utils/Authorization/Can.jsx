import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Can({ permission, children, fallback }) {
  const { user } = useSelector((store) => store.auth);

  if (
    user.roles.includes("Superadmin") ||
    user.permissions.includes(permission)
  )
    return children;

  return fallback;
}

Can.propTypes = {
  permission: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

Can.defaultProps = {
  fallback: null,
};

export default Can;
