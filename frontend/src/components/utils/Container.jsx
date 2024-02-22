import BsContainer from "react-bootstrap/esm/Container";
import PropTypes from "prop-types";

function Container({ children }) {
  return (
    <BsContainer fluid className="px-2 px-md-4 px-lg-5">
      {children}
    </BsContainer>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
