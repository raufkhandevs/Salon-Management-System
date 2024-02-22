import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import FullscreenLoader from "./FullscreenLoader";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return <FullscreenLoader />;

  return element;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default ProtectedRoute;
