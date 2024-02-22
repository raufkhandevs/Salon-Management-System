import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function CanAny({ permissions, children, fallback }) {
  const { user } = useSelector((store) => store.auth);

  if (
    user.roles.includes("Superadmin") ||
    permissions.some((permission) => user.permissions.includes(permission))
  )
    return children;

  return fallback;
}

CanAny.propTypes = {
  permissions: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

CanAny.defaultProps = {
  fallback: null,
};

export default CanAny;
